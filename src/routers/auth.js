import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUser } from '../validation/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController } from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUser),
  ctrlWrapper(registerUserController),
);

export default router;
