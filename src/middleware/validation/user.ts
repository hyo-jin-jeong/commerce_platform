import { body } from 'express-validator';
import validate from '../../middleware/validate';

const INVALID_VALUE = 'INVALID_VALUE';
const passwordReq =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

const emailAndPasswordValidate = [
  body('email').isEmail().withMessage('이메일 또는 비밀번호가 잘못되었습니다.'),
  body('password')
    .trim()
    .custom(value => passwordReq.test(value))
    .withMessage('이메일 또는 비밀번호가 잘못되었습니다.'),
];
const signupValidate = [
  ...emailAndPasswordValidate,
  body('name')
    .trim()
    .notEmpty()
    .withMessage('이름은 필수입니다.')
    .isLength({ max: 16 })
    .withMessage('이름은 최대 16자 입니다.'),
  body('countryCode').trim().notEmpty().withMessage('국가는 필수입니다.'),
  body('phoneNumber').trim().notEmpty().withMessage('연락처는 필수입니다.'),
  body('agreeTerms').isBoolean().withMessage('약관동의 형식이 잘못되었습니다.'),
  validate,
];

export { emailAndPasswordValidate, signupValidate };
