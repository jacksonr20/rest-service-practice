import { Router } from 'express';
import {
  userDelete,
  userGet,
  userPatch,
  userPost,
  userPut,
} from '../controllers/users.js';

const router = Router();

router.get('/', userGet);
router.post('/', userPost);
router.put('/:id', userPut);
router.patch('/', userPatch);
router.delete('/', userDelete);

export { router };
