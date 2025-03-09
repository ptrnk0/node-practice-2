import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from '../controllers/products.js';
import validateId from '../middlewares/validateId.js';

const app = Router();

app.get('/products', ctrlWrapper(getAllProductsController));
app.get(
  '/products/:productId',
  validateId,
  ctrlWrapper(getProductByIdController),
);
app.post('/products', ctrlWrapper(createProductController));
app.patch(
  '/products/:productId',
  validateId,
  ctrlWrapper(updateProductController),
);
app.delete(
  '/products/:productId',
  validateId,
  ctrlWrapper(deleteProductController),
);

export default app;
