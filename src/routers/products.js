import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllProductsController } from '../controllers/products.js';

const app = Router();

app.get('/products', ctrlWrapper(getAllProductsController));

export default app;
