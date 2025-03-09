import createHttpError from 'http-errors';
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../services/products.js';

export async function getAllProductsController(req, res) {
  const products = await getProducts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
}

export async function getProductByIdController(req, res) {
  const { productId } = req.params;
  const product = await getProductById(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({
    status: 200,
    message: `Product with id ${productId} found`,
    data: product,
  });
}

export async function createProductController(req, res) {
  const product = await createProduct(req.body);
  res.status(201).json({
    status: 201,
    message: 'Product created!',
    data: product,
  });
}

export async function updateProductController(req, res) {
  const { productId } = req.params;
  const product = req.body;
  const result = await updateProduct(productId, product);
  if (result === null) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a product!',
    data: result,
  });
}
