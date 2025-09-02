import { supabase } from './supabase';

export const createCheckoutSession = async (priceId: string, plan: 'standard' | 'premium') => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No active session');
    }

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
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { url } = await response.json();
    
    if (url) {
      // Open Stripe checkout in popup window
      const popup = window.open(url, 'stripe-checkout', 'width=800,height=600,scrollbars=yes,resizable=yes');
      
      // Listen for popup to close or navigate to success page
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          // Navigate directly to dashboard after popup closes
          window.location.href = '/dashboard';
        }
      }, 1000);
      
      // Also listen for success message from popup
      const messageListener = (event: MessageEvent) => {
        if (event.origin === window.location.origin && event.data === 'checkout-success') {
          clearInterval(checkClosed);
          popup?.close();
          window.removeEventListener('message', messageListener);
          // Navigate directly to dashboard
          window.location.href = '/dashboard';
        }
      };
      
      window.addEventListener('message', messageListener);
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};