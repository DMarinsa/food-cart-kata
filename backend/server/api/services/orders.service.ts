import L from '../../common/logger';
import { Product, ProductsService } from './products.service';

type OrderedItemBody = Pick<Product, 'id'> & {
  quantity: number;
};

interface OrderProductBody {
  items: OrderedItemBody[];
  currency: 'EUR' | 'USD';
}

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
      const priceWithoutSymbol = curr.totalPrice.substring(1);
      const castedPrice = Number.parseFloat(priceWithoutSymbol);
      return acc + castedPrice;
    }, 0);
  }
}

export class OrdersService {
  constructor(private productsService: ProductsService) {}
  async create(body: OrderProductBody): Promise<Order> {
    L.info(
      `create order with products ${body.items.map((item) => `${item.id} `)}`
    );

    const items = await Promise.all(
      body.items.map(async (item) => {
        const product = await this.productsService.byId(item.id);
        return {
          ...item,
          ...product,
        };
      })
    );
    const orderDto = {
      items,
      currency: body.currency,
    };
    return new Order(orderDto);
  }
}

// This should be inyected

export default new OrdersService(new ProductsService());
