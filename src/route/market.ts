import * as marketController from '../controller/market';

import {
  createMarketValidate,
  createProductValidate,
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
  createProductValidate,
  marketController.createProduct
);

export default router;
