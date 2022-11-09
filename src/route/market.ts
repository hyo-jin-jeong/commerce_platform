import * as marketController from '../controller/market';

import authentication from '../middleware/authentication';
import { body } from 'express-validator';
import express from 'express';
import validate from '../middleware/validate';

const router = express.Router();

const createMarketValidate = [
  body('marketName')
    .notEmpty()
    .withMessage('INVALID_VALUE')
    .isLength({ max: 10 })
    .withMessage('INVALID_VALUE'),
  body('bank').notEmpty().withMessage('INVALID_VALUE'),
  body('accountNumber').notEmpty().withMessage('INVALID_VALUE'),
  body('accountName').notEmpty().withMessage('INVALID_VALUE'),
  validate,
];

router.post(
  '/',
  authentication,
  createMarketValidate,
  marketController.createMarket
);

export default router;
