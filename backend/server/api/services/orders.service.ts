import L from '../../common/logger';
import { Product } from './products.service';

type OrderedProduct = Product & {
  quantity: number;
};

interface OrderDto {
  items: OrderedProduct[];
  currency: string;
}

interface Item {
  id: number;
  name: string;
  individualPrice: string;
  totalPrice: string;
}

enum Currency {
  EUR = 'EUR',
  USD = 'USD',
}

enum CurrencySymbols {
  EUR = '€',
  USD = '$',
}

class Order {
  readonly items: Item[] = [];
  readonly grandTotal: number;
  constructor(orderDto: OrderDto) {
    const currencySymbol =
      orderDto.currency === Currency.EUR
        ? CurrencySymbols.EUR
        : CurrencySymbols.USD;
    orderDto.items.forEach((item: OrderedProduct) => {
      this.items.push({
        id: item.id,
        name: item.name,
        individualPrice: `${currencySymbol}${item.cost}`,
        totalPrice: `${currencySymbol}${item.cost * item.quantity}`,
      });
    });
    this.grandTotal = this.sumGrandTotal();
  }

  private sumGrandTotal(): number {
    return this.items.reduce((acc, curr) => {
      const priceWithoutSymbol = curr.totalPrice.slice(0, 1);
      const castedPrice = Number.parseFloat(priceWithoutSymbol);
      return acc + castedPrice;
    }, 0);
  }
}

export class OrdersService {
  async create(orderDto: OrderDto): Promise<Order> {
    L.info(
      `create order with products ${orderDto.items.map(
        (item) => `${item.name} `
      )}`
    );
    return new Order(orderDto);
  }
}

export default new OrdersService();
