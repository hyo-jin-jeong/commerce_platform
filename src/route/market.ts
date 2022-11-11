import {
  createMarketValidate,
  createOrUpdateProductValidate,
} from '../middleware/validation/market';

import { MarketController } from '../controller/market';
import { ProductController } from '../controller/product';
import authentication from '../middleware/authentication';
import express from 'express';

const router = express.Router();

export const marketRouter = (
  marketController: MarketController,
  productController: ProductController
) => {
  router.post(
    '/',
    authentication,
    createMarketValidate,
    marketController.createMarket
  );
  router.post(
    '/products',
    authentication,
    createOrUpdateProductValidate,
    productController.createProduct
  );
  router.put(
    '/products/:id',
    authentication,
    createOrUpdateProductValidate,
    productController.updateProduct
  );
  router.delete(
    '/products/:id',
    authentication,
    productController.deleteProduct
  );
  router.get('/products/:id', productController.getProduct);
  router.get('/products', productController.getProducts);

  return router;
};
