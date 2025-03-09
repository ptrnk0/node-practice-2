import createHttpError from 'http-errors';
import { getProductById, getProducts } from '../services/products.js';

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
