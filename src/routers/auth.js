import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUser, registerUser } from '../validation/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUser),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUser),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserController));

export default router;
