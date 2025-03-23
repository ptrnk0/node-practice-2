import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
} from '../services/auth.js';
import { THIRTY_DAYS } from '../constants/index.js';
import createHttpError from 'http-errors';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'user registered successfully',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    hhtpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', session._id, {
    hhtpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;
  let session;

  if (sessionId) {
    session = await logoutUser(sessionId);
  }

  if (!session) {
    throw createHttpError(401);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await refreshUser(refreshToken, sessionId);

  res.cookie('refreshToken', session.refreshToken, {
    hhtpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', session._id, {
    hhtpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};
