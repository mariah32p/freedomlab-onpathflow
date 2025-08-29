export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
}

export const products: Product[] = [
  {
    id: 'basic-plan',
    priceId: 'price_basic_plan',
    name: 'Basic Plan',
    description: 'Perfect for individual coaches, small practice, freelancers',
    mode: 'subscription',
    price: 29.00
  },
  {
    id: 'pro-plan',
    priceId: 'price_pro_plan',
    name: 'Pro Plan',
    description: 'Perfect for coaching businesses, course creators, team coaches',
    mode: 'subscription',
    price: 49.00
  }
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};