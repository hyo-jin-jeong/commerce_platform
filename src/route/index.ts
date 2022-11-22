import { MarketController } from '../controller/market';
import { MarketRepository } from '../model/market';
import { MarketService } from '../service/market';
import { ProductController } from '../controller/product';
import { ProductRepository } from '../model/product';
import { ProductService } from '../service/product';
import { UserController } from '../controller/user';
import { UserRepository } from '../model/user';
import { UserService } from '../service/user';
import express from 'express';
import { marketRouter } from './market';
import { userRouter } from './user';
const router = express.Router();

router.use(
  '/users',
  userRouter(new UserController(new UserService(new UserRepository())))
);

router.use(
  '/markets',
  marketRouter(
    new MarketController(
      new MarketService(new MarketRepository(), new UserRepository())
    ),
    new ProductController(
      new ProductService(new ProductRepository(), new MarketRepository())
    )
  )
);

export default router;
