import { Request, Response } from 'express';

import { ProductService } from '../service/product';

export class ProductController {
  private productService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  createProduct = async (req: Request, res: Response) => {
    const userId = req.userId;
    const data = req.body;

    await this.productService.createProduct(userId!, data);

    res.status(201).json({ message: '성공' });
  };

  updateProduct = async (req: Request, res: Response) => {
    const userId = req.userId;
    const id = req.params.id;
    const data = req.body;

    await this.productService.updateProduct(id, userId!, data);

    res.status(201).json({ message: '성공' });
  };

  deleteProduct = async (req: Request, res: Response) => {
    const userId = req.userId;
    const id = req.params.id;

    await this.productService.deleteProduct(id, userId!);

    res.status(200).json({ message: '성공' });
  };

  getProduct = async (req: Request, res: Response) => {
    let result = null;
    const id = req.params.id;

    const product = await this.productService.getProduct(id);

    if (product) {
      const { userId, marketId, ...data } = product.toObject();
      result = data;
    }

    res.status(200).json({ data: result });
  };

  getProducts = async (req: Request, res: Response) => {
    const search = req.query.search as string;
    const category = req.query.category as string;
    const nation = req.query.nation as string;
    const sort = req.query.sort as string;

    const products = await this.productService.getProducts(
      search,
      category,
      nation,
      sort
    );

    res.status(200).json({ data: products });
  };
}
