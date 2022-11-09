import * as userController from '../controller/user';

import { body } from 'express-validator';
import express from 'express';
import validate from '../middleware/validate';

const router = express.Router();

const INVALID_VALUE = 'INVALID_VALUE';
const passwordReq =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

const emailAndPasswordValidate = [
  body('email').isEmail().withMessage(INVALID_VALUE),
  body('password')
    .trim()
    .custom(value => passwordReq.test(value))
    .withMessage(INVALID_VALUE),
];
const signupValidate = [
  ...emailAndPasswordValidate,
  body('name')
    .trim()
    .notEmpty()
    .withMessage(INVALID_VALUE)
    .isLength({ max: 16 })
    .withMessage(INVALID_VALUE),
  body('countryCode').trim().notEmpty().withMessage(INVALID_VALUE),
  body('phoneNumber').trim().notEmpty().withMessage(INVALID_VALUE),
  body('agreeTerms').isBoolean().withMessage(INVALID_VALUE),
  validate,
];
router.post('/signup', signupValidate, userController.signup);
router.post('/login', emailAndPasswordValidate, userController.login);

export default router;
