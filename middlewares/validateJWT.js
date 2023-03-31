import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No token in request',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEYJWT);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token. This user does not exists',
      });
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'Invalid token',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

export { validateJWT };
