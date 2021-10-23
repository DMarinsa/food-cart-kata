import OrdersService from '../../services/orders.service';
import { Request, Response } from 'express';

export class Controller {
  // TODO: add endpoint request validation joi, express-validator...
  create(req: Request, res: Response): void {
    const { items, currency } = req.body;
    const order = {
      items,
      currency,
    };
    OrdersService.create(order).then((r) =>
      res.status(201).location(`/api/v1/orders`).json(r)
    );
  }
}
export default new Controller();
