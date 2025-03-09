import { ProductModel } from '../db/model/products.js';

export async function getProducts() {
  return await ProductModel.find();
}

export async function getProductById(productId) {
  return await ProductModel.findById(productId);
}
