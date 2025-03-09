import { ProductModel } from '../db/model/products.js';

export async function getProducts() {
  return await ProductModel.find();
}
