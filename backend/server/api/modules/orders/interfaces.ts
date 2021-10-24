import { Product } from '../../services/products.service';

type OrderedItemBody = Pick<Product, 'id'> & {
  quantity: number;
};

export interface OrderProductBody {
  items: OrderedItemBody[];
  currency: Currency;
}

export type OrderedProduct = Product & {
  quantity: number;
};

export interface OrderDto {
  items: OrderedProduct[];
  currency: Currency;
}

export enum OfferName {
  SoupAndBreadBOGOF = '_Soup And Bread BOGOF_',
  SundaySoupSale = '_Sunday Soup Sale_',
  DairyDelicious = '_Dairy Delicious_',
}

export enum OfferDescription {
  SoupAndBreadBOGOF = 'Buy a loaf of bread and a can of soup and get another soup for free. Maximum 3 free soups per customer.',
  SundaySoupSale = 'Buy any can of soup on a Sunday and get 10% off.',
  DairyDelicious = "Buy a block of cheese and we'll let you buy as much milk as you like, at the price we pay! Offer not valid when the customer is participating in the Sunday Soup Sale.",
}
export interface Offer {
  name: OfferName;
  description: OfferDescription;
}

export interface Item {
  id: number;
  name: string;
  individualPrice: string;
  totalPrice: string;
  cost: number;
  quantity: number;
  discountedPrice?: string;
}

export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
}

export enum CurrencySymbols {
  EUR = '€',
  USD = '$',
}

export interface Order {
  items: Omit<Item, 'cost'>[];
  grandTotal: number;
  appliedOffers?: Offer[];
}
