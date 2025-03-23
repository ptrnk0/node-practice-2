import { Router } from 'express';
import userRouter from '../routers/auth.js';
import productRouter from '../routers/products.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use('/users', userRouter);
router.use('/products', authenticate, productRouter);
export default router;
