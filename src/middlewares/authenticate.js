import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/model/session.js';
import { UsersCollection } from '../db/model/user.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(createHttpError(401, 'Pleaze provide authorization'));
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  const session = await SessionsCollection.findOne({ accessToken });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }
  if (new Date(session.accessTokenValidUntil) < new Date()) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    return next(createHttpError(401));
  }

  req.user = user._id;
  next();
};
