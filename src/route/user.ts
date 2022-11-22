import {
  emailAndPasswordValidate,
  signupValidate,
} from '../middleware/validation/user';

import { UserController } from '../controller/user';
import express from 'express';

const router = express.Router();

export const userRouter = (userController: UserController) => {
  router.post('/signup', signupValidate, userController.signup);
  router.post('/login', emailAndPasswordValidate, userController.login);
  return router;
};
