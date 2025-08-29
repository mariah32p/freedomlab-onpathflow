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
    id: 'prod_SvjFuBUJWo55xd',
    priceId: 'price_1RzrmtDn6VTzl81bN2GklgrP',
    name: 'OnPathFlow',
    description: 'Visual goal tracking and milestone management for coaches, trainers, and course creators. Keep clients motivated with beautiful progress paths, automated check-ins, and celebration moments.',
    mode: 'subscription',
    price: 29.00
  }
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};