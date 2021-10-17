import ProductsService from '../../services/products.service';
import { Request, Response } from 'express';

export class Controller {
  create(req: Request, res: Response): void {
    const { name, customerPrice, cost } = req.body;
    ProductsService.create(name, customerPrice, cost).then((r) =>
      res.status(201).location(`/api/v1/product/${r.id}`).json(r)
    );
  }
}
export default new Controller();
