export const stripeConfig = {
  products: {
    standard: {
      priceId: 'price_1RzrmtDn6VTzl81bN2GklgrP',
      name: 'Standard',
      description: 'Perfect for getting started',
      mode: 'subscription' as const,
      amount: 2900, // $29.00 in cents
    },
    premium: {
      priceId: 'price_1RzrmtDn6VTzl81bPe2nkeMj',
      name: 'Premium', 
      description: 'For serious coaches',
      mode: 'subscription' as const,
      amount: 4900, // $49.00 in cents
    }
  }