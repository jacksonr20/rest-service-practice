import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields.js';
import { emailExists, isValidRole } from '../database/helpers/validators.js';
import {
  userDelete,
  userGet,
  userPatch,
  userPost,
  userPut,
} from '../controllers/users.js';

const router = Router();

router.get('/', userGet);
router.post(
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
router.put('/:id', userPut);
router.patch('/', userPatch);
router.delete('/', userDelete);

export { router };
