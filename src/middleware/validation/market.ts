import { DELIVERY_TYPE, OPTION_TYPE } from '../../model/product';

import { body } from 'express-validator';
import validate from '../../middleware/validate';

const createMarketValidate = [
  body('marketName')
    .notEmpty()
    .withMessage('마켓 이름은 필수입니다.')
    .isLength({ max: 10 })
    .withMessage('마켓이름은 최대 10글자 입니다.'),
  body('bank').notEmpty().withMessage('은행 이름은 필수입니다.'),
  body('accountNumber').notEmpty().withMessage('은행 계좌는 필수입니다.'),
  body('accountName').notEmpty().withMessage('예금주명은 필수입니다.'),
  validate,
];

const createOrUpdateProductValidate = [
  body('productName')
    .notEmpty()
    .withMessage('상품 이름은 필수입니다.')
    .isLength({ max: 80 })
    .withMessage('상품 이름은 최대 80자 입니다.'),
  body('mainCategory')
    .notEmpty()
    .withMessage('메인 카테고리 선택은 필수입니다.'),
  body('subCategory')
    .notEmpty()
    .withMessage('서브 카테고리 선택은 필수입니다.'),
  body('productInfo')
    .notEmpty()
    .withMessage('상품설명은 필수입니다.')
    .isLength({ max: 1000 })
    .withMessage('상품설명은 최대 1000자 입니다.'),
  body('purchaseDate')
    .optional()
    .isDate()
    .withMessage('구매일 데이터 형식이 잘못되었습니다.'),
  body('price')
    .notEmpty()
    .withMessage('가격은 필수입니다.')
    .isInt({ max: 100000000 })
    .withMessage('가격은 최대 100,000,000입니다.'),
  body('optionType')
    .custom(value => {
      if (value === OPTION_TYPE.SINGLE || value === OPTION_TYPE.GROUP) {
        return true;
      }
    })
    .withMessage('option type이 잘못되었습니다.'),
  body('optionList.*.type')
    .optional()
    .isLength({ max: 10 })
    .withMessage('옵션 타입은 최대 10자 입니다.'),
  body('optionList.*.name')
    .notEmpty()
    .withMessage('옵션 이름은 필수입니다.')
    .isLength({ max: 20 })
    .withMessage('옵션 이름은 최대 20자 입니다.'),
  body('optionList.*.stock')
    .isInt({ max: 100 })
    .withMessage('재고수는 필수입니다.'),
  body('deliveryInfo.country')
    .notEmpty()
    .withMessage('구매지역 국가는 필수입니다.'),
  body('deliveryInfo.dueDate')
    .isDate()
    .withMessage('주문 마감일은 필수입니다.'),
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
    .withMessage('배송타입이 잘못되었습니다.'),
  body('deliveryInfo.price')
    .optional()
    .isInt({ max: 300000 })
    .withMessage('배송비는 최대 30,000입니다.'),
  body('deliveryInfo.bundle')
    .isBoolean()
    .withMessage('묶음배송 형식이 잘못되었습니다.'),
  body('deliveryInfo.sendData')
    .notEmpty()
    .withMessage('발송예정일은 필수입니다.')
    .isDate()
    .withMessage('발송예정일 형식이 잘못되었습니다.'),
  validate,
];

export { createMarketValidate, createOrUpdateProductValidate };
