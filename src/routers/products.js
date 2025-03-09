import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
} from '../controllers/products.js';

const app = Router();

app.get('/products', ctrlWrapper(getAllProductsController));
app.get('/products/:productId', ctrlWrapper(getProductByIdController));
app.post('/products', ctrlWrapper(createProductController));

export default app;
