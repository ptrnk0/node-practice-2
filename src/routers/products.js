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
import {
  createProductSchema,
  updateProductSchema,
} from '../validation/products.js';
import { validateBody } from '../middlewares/validateBody.js';

const app = Router();

app.get('/', ctrlWrapper(getAllProductsController));
app.get('/:productId', validateId, ctrlWrapper(getProductByIdController));
app.post(
  '/',
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);
app.patch(
  '/:productId',

  validateId,
  validateBody(updateProductSchema),
  ctrlWrapper(updateProductController),
);
app.delete('/:productId', validateId, ctrlWrapper(deleteProductController));

export default app;
