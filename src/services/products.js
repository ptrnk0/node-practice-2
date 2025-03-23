import { ProductModel } from '../db/model/products.js';

export async function getProducts({ category, minPrice, maxPrice }) {
  const productQuery = ProductModel.find();

  if (category) {
    productQuery.where('category').equals(category);
  }

  if (minPrice) {
    productQuery.where('price').gte(minPrice);
  }

  if (maxPrice) {
    productQuery.where('price').lte(maxPrice);
  }

  return productQuery;
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

export async function deleteProduct(productId) {
  return await ProductModel.findByIdAndDelete(productId);
}
