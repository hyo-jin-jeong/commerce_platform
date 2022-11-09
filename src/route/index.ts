import express from 'express';
import marketRouter from './market';
import userRouter from './user';
const router = express.Router();

router.use('/users', userRouter);
router.use('/markets', marketRouter);

export default router;
