import { Schema, Model, model } from 'mongoose';
import { validCathegory } from '../../constants/index.js';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: validCathegory,
      required: true,
      default: 'other',
    },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductModel = model('products', productSchema);
