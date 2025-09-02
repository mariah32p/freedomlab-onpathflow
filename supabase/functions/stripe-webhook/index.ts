import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'OnPathFlow Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

Deno.serve(async (req) => {
  try {
    console.log('🎯 Webhook received:', req.method, req.url);
    
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204,
        headers: corsHeaders
      });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: corsHeaders
      });
    }

    // Get the signature from the header
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response(
        JSON.stringify({ error: 'No signature found' }), 
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get the raw body
    const body = await req.text();
    console.log('📦 Webhook body length:', body.length);

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return new Response(
        JSON.stringify({ error: `Webhook signature verification failed: ${error.message}` }), 
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('✅ Webhook event verified:', event.type, event.id);
    
    // Process the event asynchronously
    EdgeRuntime.waitUntil(processEvent(event));

    return new Response(
      JSON.stringify({ received: true }), 
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function processEvent(event: Stripe.Event) {
  try {
    console.log('🔄 Processing webhook event:', event.type);
    const stripeData = event?.data?.object ?? {};

    if (!stripeData || !('customer' in stripeData)) {
      console.log('❌ No customer data in event');
      return;
    }

    const { customer: customerId } = stripeData;
    if (!customerId || typeof customerId !== 'string') {
      console.error(`❌ No valid customer ID in event: ${event.type}`);
      return;
    }

    console.log('👤 Processing event for customer:', customerId);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session, customerId);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await syncCustomerFromStripe(customerId);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(customerId);
        break;
      case 'invoice.payment_failed':
        await handlePaymentFailed(customerId);
        break;
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(customerId);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('❌ Error processing event:', error);
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session, customerId: string) {
  const { mode, payment_status, client_reference_id } = session;
  const isSubscription = mode === 'subscription';

  console.log(`🛒 Processing ${isSubscription ? 'subscription' : 'one-time payment'} checkout session`);

  if (isSubscription) {
    // Store customer relationship - only if we have a user ID
    if (client_reference_id) {
      console.log(`🔗 Linking customer ${customerId} to user ${client_reference_id}`);
      
      const { error: customerError } = await supabase.from('stripe_customers').upsert({
        customer_id: customerId,
        user_id: client_reference_id,
      }, {
        onConflict: 'customer_id',
      });

      if (customerError) {
        console.error('❌ Error storing customer relationship:', customerError);
      } else {
        console.log(`✅ Successfully linked customer ${customerId} to user ${client_reference_id}`);
      }
    }

    // Sync subscription data to both stripe_subscriptions AND profiles
    await syncCustomerFromStripe(customerId);
  } else if (mode === 'payment' && payment_status === 'paid') {
    // Handle one-time payment
    const {
      id: checkout_session_id,
      payment_intent,
      amount_subtotal,
      amount_total,
      currency,
    } = session;

    const { error: orderError } = await supabase.from('stripe_orders').insert({
      checkout_session_id,
      payment_intent_id: payment_intent as string,
      customer_id: customerId,
      amount_subtotal: amount_subtotal || 0,
      amount_total: amount_total || 0,
      currency: currency || 'usd',
      payment_status,
      status: 'completed',
    });

    if (orderError) {
      console.error('❌ Error inserting order:', orderError);
    } else {
      console.log(`✅ Successfully processed one-time payment for session: ${checkout_session_id}`);
    }
  }
}

async function syncCustomerFromStripe(customerId: string) {
  try {
    console.log('🔄 Starting subscription sync for customer:', customerId);
    
    // Fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    console.log('📊 Found subscriptions:', subscriptions.data.length);
    
    if (subscriptions.data.length === 0) {
      console.log('❌ No subscriptions found for customer:', customerId);
      
      // Update stripe_subscriptions table
      const { error: noSubError } = await supabase.from('stripe_subscriptions').upsert({
        customer_id: customerId,
        status: 'not_started',
      }, {
        onConflict: 'customer_id',
      });

      if (noSubError) {
        console.error('❌ Error updating subscription status:', noSubError);
      }
      return;
    }

    // Assumes that a customer can only have a single subscription
    const subscription = subscriptions.data[0];

    console.log('💳 Subscription details:', {
      id: subscription.id,
      status: subscription.status,
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      trial_end: subscription.trial_end
    });

    // Determine plan from price ID
    const priceId = subscription.items.data[0].price.id;
    let plan = 'standard';
    if (priceId === 'price_1RzrmtDn6VTzl81bPe2nkeMj') {
      plan = 'premium';
    }

    console.log('📋 Determined plan:', plan, 'from price ID:', priceId);

    // Store subscription state in stripe_subscriptions
    const subscriptionData: any = {
      customer_id: customerId,
      subscription_id: subscription.id,
      price_id: priceId,
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      status: subscription.status,
    };

    // Add payment method info if available
    if (subscription.default_payment_method && typeof subscription.default_payment_method !== 'string') {
      subscriptionData.payment_method_brand = subscription.default_payment_method.card?.brand ?? null;
      subscriptionData.payment_method_last4 = subscription.default_payment_method.card?.last4 ?? null;
    }

    const { error: subError } = await supabase.from('stripe_subscriptions').upsert(subscriptionData, {
      onConflict: 'customer_id',
    });

    if (subError) {
      console.error('❌ Error syncing subscription:', subError);
      throw new Error('Failed to sync subscription in database');
    } else {
      console.log('✅ Successfully synced subscription to stripe_subscriptions table');
    }

    // CRITICAL: Update profiles table with subscription data
    await updateProfileFromSubscription(customerId, subscription, plan);
  } catch (error) {
    console.error(`❌ Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}

async function updateProfileFromSubscription(customerId: string, subscription: Stripe.Subscription, plan: string) {
  try {
    console.log('🔄 Updating profile from subscription data for customer:', customerId);

    // Find the user ID from the customer mapping
    const { data: customerData, error: customerError } = await supabase
      .from('stripe_customers')
      .select('user_id')
      .eq('customer_id', customerId)
      .single();

    if (customerError || !customerData) {
      console.error('❌ Could not find user for customer:', customerId, customerError);
      return;
    }

    const userId = customerData.user_id;
    console.log('👤 Found user ID:', userId, 'for customer:', customerId);

    // Prepare profile updates
    const profileUpdates: any = {
      plan,
      subscription_status: subscription.status,
      customer_id: customerId,
      subscription_id: subscription.id,
      current_period_end: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
    };

    // Handle trial end date
    if (subscription.trial_end) {
      profileUpdates.trial_ends_at = new Date(subscription.trial_end * 1000).toISOString();
    }

    // Clear payment issue timestamp if subscription is active/trialing
    if (subscription.status === 'active' || subscription.status === 'trialing') {
      profileUpdates.payment_issue_since = null;
    }

    console.log('📝 Updating profile with:', profileUpdates);

    // Update the profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .update(profileUpdates)
      .eq('id', userId);

    if (profileError) {
      console.error('❌ Error updating profile:', profileError);
      throw new Error('Failed to update profile with subscription data');
    } else {
      console.log('✅ Successfully updated profile for user:', userId);
    }
  } catch (error) {
    console.error('❌ Error updating profile from subscription:', error);
    throw error;
  }
}

async function handleSubscriptionDeleted(customerId: string) {
  console.log('🗑️ Handling subscription deletion for customer:', customerId);
  
  // Update stripe_subscriptions
  const { error: subError } = await supabase.from('stripe_subscriptions').upsert({
    customer_id: customerId,
    status: 'canceled',
  }, {
    onConflict: 'customer_id',
  });

  if (subError) {
    console.error('❌ Error updating canceled subscription:', subError);
  }

  // Update profiles table
  const { data: customerData } = await supabase
    .from('stripe_customers')
    .select('user_id')
    .eq('customer_id', customerId)
    .single();

  if (customerData) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        subscription_status: 'canceled',
        payment_issue_since: null
      })
      .eq('id', customerData.user_id);

    if (profileError) {
      console.error('❌ Error updating profile for canceled subscription:', profileError);
    } else {
      console.log('✅ Successfully updated profile for canceled subscription');
    }
  }
}

async function handlePaymentFailed(customerId: string) {
  console.log('💳 Handling payment failure for customer:', customerId);
  
  // Update stripe_subscriptions
  const { error: subError } = await supabase.from('stripe_subscriptions').upsert({
    customer_id: customerId,
    status: 'past_due',
  }, {
    onConflict: 'customer_id',
  });

  if (subError) {
    console.error('❌ Error updating past due subscription:', subError);
  }

  // Update profiles table with payment issue timestamp
  const { data: customerData } = await supabase
    .from('stripe_customers')
    .select('user_id')
    .eq('customer_id', customerId)
    .single();

  if (customerData) {
    // Only set payment_issue_since if it's not already set
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('payment_issue_since')
      .eq('id', customerData.user_id)
      .single();

    const profileUpdates: any = {
      subscription_status: 'past_due'
    };

    if (!currentProfile?.payment_issue_since) {
      profileUpdates.payment_issue_since = new Date().toISOString();
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .update(profileUpdates)
      .eq('id', customerData.user_id);

    if (profileError) {
      console.error('❌ Error updating profile for payment failure:', profileError);
    } else {
      console.log('✅ Successfully updated profile for payment failure');
    }
  }
}

async function handlePaymentSucceeded(customerId: string) {
  console.log('💰 Handling payment success for customer:', customerId);
  
  // Payment succeeded, so clear any payment issues and sync latest data
  await syncCustomerFromStripe(customerId);
}