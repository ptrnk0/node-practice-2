import Joi from 'joi';
import { validCathegory } from '../constants/index.js';

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().required(),
  category: Joi.string()
    .valid(...validCathegory)
    .required(),
  description: Joi.string().max(1000),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  price: Joi.number(),
  category: Joi.string().valid(...validCathegory),
  description: Joi.string().max(1000),
});
