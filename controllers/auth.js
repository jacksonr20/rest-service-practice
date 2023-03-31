import bcryptjs from 'bcryptjs';
import { request, response } from 'express';
import { User } from '../models/user.js';
import { generateJWT, googleVerify } from '../helpers/index.js';

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

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: ':P',
        picture,
        google: true,
        role: 'USER_ROLE',
      };

      user = new User(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'Speak to the administrator, User blocked',
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
      id_token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'Token could not be verified',
    });
  }
};

export { login, googleSignIn };
