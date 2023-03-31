import bcryptjs from 'bcryptjs';
import { request, response } from 'express';
import { User } from '../models/user.js';
import { generateJWT } from '../helpers/generateJWT.js';

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'User / Password not correct - email',
      });
    }

    if (!user.status) {
      return res.status(400).json({
        msg: 'User/Password not correct - Status: false',
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User/Password are not correct - password',
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Something went wrong with the login process',
    });
  }
};

export { login };
