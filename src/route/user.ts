import * as userController from '../controller/user';

import {
  emailAndPasswordValidate,
  signupValidate,
} from '../middleware/validation/user';

import express from 'express';

const router = express.Router();

router.post('/signup', signupValidate, userController.signup);
router.post('/login', emailAndPasswordValidate, userController.login);

export default router;
