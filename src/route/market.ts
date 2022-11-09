import * as marketController from '../controller/market';

import {
  createMarketValidate,
  createOrUpdateProductValidate,
} from '../middleware/validation/market';

import authentication from '../middleware/authentication';
import express from 'express';

const router = express.Router();

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
  marketController.createProduct
);
router.put(
  '/products/:id',
  authentication,
  createOrUpdateProductValidate,
  marketController.updateProduct
);

router.delete('/products/:id', authentication, marketController.deleteProduct);

router.get('/products/:id', marketController.getProduct);
export default router;
