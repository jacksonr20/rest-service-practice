import { Router } from 'express';
import { check } from 'express-validator';
import {
  validateFields,
  validateJWT,
  isAdminRole,
  hasRole,
} from '../middlewares/index.js';
import {
  emailExists,
  isValidRole,
  userExistsById,
} from '../database/helpers/validators.js';
import {
  userDelete,
  userGet,
  userPost,
  userPut,
} from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', userGet);
userRouter.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check(
      'password',
      'Password must be longer than 8 characters and is required'
    ).isLength({ min: 8 }),
    check('email', 'This is not a valid email').isEmail(),
    check('email', 'Email already exists').custom(emailExists),
    check('role').custom(isValidRole),
    validateFields,
  ],
  userPost
);
userRouter.put(
  '/:id',
  [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isValidRole),
  ],
  validateFields,
  userPut
);
userRouter.delete(
  '/:id',
  [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(userExistsById),
    validateFields,
  ],
  userDelete
);

export { userRouter };
