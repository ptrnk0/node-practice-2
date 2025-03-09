import { ProductModel } from '../db/model/products.js';

export async function getProducts() {
  return await ProductModel.find();
}

export async function getProductById(productId) {
  return await ProductModel.findById(productId);
}

export async function createProduct(payload) {
  return await ProductModel.create(payload);
}

export async function updateProduct(productId, product) {
  return await ProductModel.findByIdAndUpdate(productId, product, {
    new: true,
  });
}
