import { Router } from 'express';
import userRouter from '../routers/auth.js';
import productRouter from '../routers/products.js';

const router = Router();
router.use('/users',userRouter);
router.use('/products',productRouter);
export default router;
