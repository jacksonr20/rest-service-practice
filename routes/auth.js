import { Router } from 'express';
import { check } from 'express-validator';
import { login, googleSignIn } from '../controllers/auth.js';
import { validateFields } from '../middlewares/validateFields.js';

const authRouter = Router();

authRouter.post(
  '/login',
  [
    check('email', 'This is not a valid email.').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateFields,
  ],
  login
);

authRouter.post(
  '/google',
  [check('id_token', 'id_token is required').notEmpty(), validateFields],
  googleSignIn
);

export { authRouter };
