import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from '../controllers/products.js';

const app = Router();

app.get('/products', ctrlWrapper(getAllProductsController));
app.get('/products/:productId', ctrlWrapper(getProductByIdController));
app.post('/products', ctrlWrapper(createProductController));
app.patch('/products/:productId', ctrlWrapper(updateProductController));

export default app;
