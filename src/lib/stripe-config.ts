export const stripeConfig = {
  products: {
    standard: {
      priceId: 'price_1234567890abcdef', // Replace with actual Stripe price ID for standard plan
      name: 'Standard',
      description: 'Perfect for getting started',
      mode: 'subscription' as const,
      amount: 2900, // $29.00 in cents
    },
    premium: {
      priceId: 'price_0987654321fedcba', // Replace with actual Stripe price ID for premium plan
      name: 'Premium', 
      description: 'For serious coaches',
      mode: 'subscription' as const,
      amount: 4900, // $49.00 in cents
    }
  }
};

// Note: You'll need to replace the priceId values above with your actual Stripe price IDs
// These should be subscription prices configured in your Stripe dashboard with 7-day trials