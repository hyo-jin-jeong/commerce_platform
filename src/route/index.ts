import { UserController } from '../controller/user';
import { UserRepository } from '../model/user';
import { UserService } from '../service/user';
import express from 'express';
import marketRouter from './market';
import userRouter from './user';
const router = express.Router();

router.use(
  '/users',
  userRouter(new UserController(new UserService(new UserRepository())))
);
router.use('/markets', marketRouter);

export default router;
