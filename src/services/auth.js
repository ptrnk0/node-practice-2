import createHttpError from 'http-errors';
import { UsersCollection } from '../db/model/user.js';
import { SessionsCollection } from '../db/model/session.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MIN, THIRTY_DAYS } from '../constants/index.js';
import bcrypt from 'bcrypt';

export const registerUser = async (value) => {
  const user = await UsersCollection.findOne({ email: value.email });
  if (user) {
    throw createHttpError(409, 'user is already exist');
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);

  const newUser = await UsersCollection.create({
    ...value,
    password: hashedPassword,
  });
  return newUser;
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  const isEqualPassword = await bcrypt.compare(payload.password, user.password);

  if (!isEqualPassword) {
    throw createHttpError(401, 'Email or password is not correct');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MIN),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const logoutUser = async (sessionId) => {
  return SessionsCollection.deleteOne({ _id: sessionId });
};

export const refreshUser = async (oldRefreshToken, sessionId) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken: oldRefreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'session not found');
  }

  const isExpiredRefreshToken =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isExpiredRefreshToken) {
    throw createHttpError(401, 'session token expired');
  }

  await SessionsCollection.deleteOne({ _id: sessionId });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return SessionsCollection.create({
    userId: session.userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MIN),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};
