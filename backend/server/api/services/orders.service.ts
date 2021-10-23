import L from '../../common/logger';
import { Order, OrderProductBody } from '../modules/orders/interfaces';
import { Cart } from '../modules/orders/Cart';
import { ProductsService } from './products.service';

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
    const cart = new Cart(orderDto.currency);
    items.forEach((item) => cart.addLine(item));
    return cart.retrieveOrder();
  }
}

// TODO: Use inversify, tsyringe or something similar instead of import.

export default new OrdersService(new ProductsService());
