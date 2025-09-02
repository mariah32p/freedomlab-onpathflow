import { supabase } from './supabase';

export const createCheckoutSession = async (priceId: string, plan: 'standard' | 'premium') => {
  try {
    console.log('🚀 Starting checkout session creation', { priceId, plan });
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      console.error('❌ No active session found');
      throw new Error('No active session');
    }
    
    console.log('✅ User session found, calling edge function');

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price_id: priceId,
        success_url: `${window.location.origin}/checkout-success`,
        cancel_url: `${window.location.origin}/get-started`,
        mode: 'subscription'
      }),
    });

    if (!response.ok) {
      console.error('❌ Edge function failed', response.status, response.statusText);
      const errorData = await response.json();
      console.error('❌ Error data:', errorData);
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { url } = await response.json();
    console.log('✅ Checkout session created, URL received:', url);
    
    if (url) {
      console.log('🪟 Opening popup window for checkout');
      // Open Stripe checkout in popup window
      const popup = window.open(url, 'stripe-checkout', 'width=800,height=600,scrollbars=yes,resizable=yes');
      
      if (!popup) {
        console.error('❌ Popup blocked by browser');
        throw new Error('Popup was blocked. Please allow popups and try again.');
      }
      
      // Listen for popup to close or navigate to success page
      const checkClosed = setInterval(() => {
        console.log('🔍 Checking if popup is closed...');
        if (popup?.closed) {
          console.log('🪟 Popup closed, navigating to dashboard');
          clearInterval(checkClosed);
          // Navigate directly to dashboard after popup closes
          window.location.href = '/dashboard';
        }
      }, 1000);
      
      // Also listen for success message from popup
      const messageListener = (event: MessageEvent) => {
        console.log('📨 Received message from popup:', event.data, 'from origin:', event.origin);
        if (event.origin === window.location.origin && event.data === 'checkout-success') {
          console.log('✅ Checkout success message received, closing popup and navigating');
          clearInterval(checkClosed);
          popup?.close();
          window.removeEventListener('message', messageListener);
          // Navigate directly to dashboard
          window.location.href = '/dashboard';
        }
      };
      
      window.addEventListener('message', messageListener);
      console.log('👂 Message listener added, waiting for checkout completion');
    } else {
      console.error('❌ No checkout URL returned from edge function');
      throw new Error('No checkout URL returned');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};