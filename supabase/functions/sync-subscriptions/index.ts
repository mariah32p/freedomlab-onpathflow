import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'OnPathFlow Sync',
    version: '1.0.0',
  },
});

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  try {
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

    console.log('🔄 Starting retroactive subscription sync...');

    // Get all existing stripe customers
    const { data: customers, error: customersError } = await supabase
      .from('stripe_customers')
      .select('customer_id, user_id')
      .is('deleted_at', null);

    if (customersError) {
      throw new Error(`Failed to fetch customers: ${customersError.message}`);
    }

    console.log(`📊 Found ${customers.length} customers to sync`);

    let syncedCount = 0;
    let errorCount = 0;

    for (const customer of customers) {
      try {
        console.log(`🔄 Syncing customer: ${customer.customer_id}`);
        
        // Fetch subscription from Stripe
        const subscriptions = await stripe.subscriptions.list({
          customer: customer.customer_id,
          limit: 1,
          status: 'all',
          expand: ['data.default_payment_method'],
        });

        if (subscriptions.data.length === 0) {
          console.log(`❌ No subscription found for customer: ${customer.customer_id}`);
          
          // Update profile to reflect no subscription
          await supabase
            .from('profiles')
            .update({
              subscription_status: 'not_started',
              customer_id: customer.customer_id
            })
            .eq('id', customer.user_id);
          
          continue;
        }

        const subscription = subscriptions.data[0];
        
        // Determine plan from price ID
        const priceId = subscription.items.data[0].price.id;
        let plan = 'standard';
        if (priceId === 'price_1RzrmtDn6VTzl81bPe2nkeMj') {
          plan = 'premium';
        }

        console.log(`📋 Customer ${customer.customer_id}: ${subscription.status} (${plan})`);

        // Update stripe_subscriptions table
        const subscriptionData: any = {
          customer_id: customer.customer_id,
          subscription_id: subscription.id,
          price_id: priceId,
          current_period_start: subscription.current_period_start,
          current_period_end: subscription.current_period_end,
          cancel_at_period_end: subscription.cancel_at_period_end,
          status: subscription.status,
        };

        if (subscription.default_payment_method && typeof subscription.default_payment_method !== 'string') {
          subscriptionData.payment_method_brand = subscription.default_payment_method.card?.brand ?? null;
          subscriptionData.payment_method_last4 = subscription.default_payment_method.card?.last4 ?? null;
        }

        await supabase.from('stripe_subscriptions').upsert(subscriptionData, {
          onConflict: 'customer_id',
        });

        // Update profiles table
        const profileUpdates: any = {
          plan,
          subscription_status: subscription.status,
          customer_id: customer.customer_id,
          subscription_id: subscription.id,
          current_period_end: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
        };

        // Handle trial end date
        if (subscription.trial_end) {
          profileUpdates.trial_ends_at = new Date(subscription.trial_end * 1000).toISOString();
        }

        // Clear payment issues if subscription is healthy
        if (subscription.status === 'active' || subscription.status === 'trialing') {
          profileUpdates.payment_issue_since = null;
        }

        await supabase
          .from('profiles')
          .update(profileUpdates)
          .eq('id', customer.user_id);

        syncedCount++;
        console.log(`✅ Synced customer ${customer.customer_id} successfully`);

      } catch (error) {
        console.error(`❌ Error syncing customer ${customer.customer_id}:`, error);
        errorCount++;
      }
    }

    console.log(`🎉 Sync complete: ${syncedCount} synced, ${errorCount} errors`);

    return new Response(
      JSON.stringify({ 
        success: true,
        synced: syncedCount,
        errors: errorCount,
        total: customers.length
      }), 
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('❌ Sync error:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});