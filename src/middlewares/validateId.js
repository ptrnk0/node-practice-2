import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

function validateId(req, res, next) {
  const { productId } = req.params;

  if (!isValidObjectId(productId)) {
    throw createHttpError(400, 'Not valide id');
  }

  next();
}

export default validateId;
