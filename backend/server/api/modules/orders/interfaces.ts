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

export interface Item {
  id: number;
  name: string;
  individualPrice: string;
  totalPrice: string;
  discountedPrice?: string;
  appliedOffer?:
    | '_Soup And Bread BOGOF_'
    | '_Sunday Soup Sale_'
    | '_Dairy Delicious_';
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
  items: Item[];
  grandTotal: number;
}
