import { ProductModel } from '../db/model/products.js';

export async function getProducts({ category, minPrice, maxPrice, userId }) {
  const productQuery = ProductModel.find({ userId });

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

export async function getProductById(productId, userId) {
  return await ProductModel.findOne({ _id: productId, userId });
}

export async function createProduct(payload) {
  return await ProductModel.create(payload);
}

export async function updateProduct(productId, userId, product) {
  return await ProductModel.findOneAndUpdate(
    { _id: productId, userId },
    product,
    {
      new: true,
    },
  );
}

export async function deleteProduct(productId, userId) {
  return await ProductModel.findOneAndDelete({ _id: productId, userId });
}
