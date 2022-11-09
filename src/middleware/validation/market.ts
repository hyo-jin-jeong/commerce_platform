import { DELIVERY_TYPE, OPTION_TYPE } from '../../model/product';

import { body } from 'express-validator';
import validate from '../../middleware/validate';

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

const createProductValidate = [
  body('productName')
    .notEmpty()
    .withMessage('INVALID_VALUE')
    .isLength({ max: 80 })
    .withMessage('INVALID_VALUE'),
  body('mainCategory').notEmpty().withMessage('INVALID_VALUE'),
  body('subCategory').notEmpty().withMessage('INVALID_VALUE'),
  body('productInfo')
    .notEmpty()
    .withMessage('INVALID_VALUE')
    .isLength({ max: 1000 })
    .withMessage('INVALID_VALUE'),
  body('purchaseDate').optional().isDate().withMessage('INVALID_VALUE'),
  body('price')
    .notEmpty()
    .isInt({ max: 100000000 })
    .withMessage('INVALID_VALUE'),
  body('optionType')
    .custom(value => {
      if (value === OPTION_TYPE.SINGLE || value === OPTION_TYPE.GROUP) {
        return true;
      }
    })
    .withMessage('INVALID_VALUE'),
  body('optionList.*.type')
    .optional()
    .isLength({ max: 10 })
    .withMessage('INVALID_VALUE'),
  body('optionList.*.name')
    .notEmpty()
    .withMessage('INVALID_VALUE')
    .isLength({ max: 20 })
    .withMessage('INVALID_VALUE'),
  body('optionList.*.stock').isInt({ max: 100 }).withMessage('INVALID_VALUE'),
  body('deliveryInfo.country').notEmpty().withMessage('INVALID_VALUE'),
  body('deliveryInfo.dueDate').isDate().withMessage('INVALID_VALUE'),
  body('deliveryInfo.type')
    .custom(value => {
      if (
        value === DELIVERY_TYPE.IN_KOREA ||
        value === DELIVERY_TYPE.ABROAD ||
        value === DELIVERY_TYPE.DIREACT
      ) {
        return true;
      }
    })
    .withMessage('INVALID_VALUE'),
  body('deliveryInfo.price')
    .optional()
    .isInt({ max: 300000 })
    .withMessage('INVALID_VALUE'),
  body('deliveryInfo.bundle').isBoolean().withMessage('INVALID_VALUE'),
  body('deliveryInfo.sendData')
    .notEmpty()
    .withMessage('INVALID_VALUE1')
    .isDate()
    .withMessage('INVALID_VALUE2'),
  validate,
];

export { createMarketValidate, createProductValidate };
