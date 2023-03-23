import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.js';

const userGet = (req = request, res = response) => {
  const { q, name = 'No name', apiKey } = req.query;

  res.json({
    msg: 'get API - Controller',
    q,
    name,
    apiKey,
  });
};

const userPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    user,
  });
};

const userPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    msg: 'put API - Controller',
    user,
  });
};

const userPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch API - Controller',
  });
};

const userDelete = (req = request, res = response) => {
  res.json({
    msg: 'delete API - Controller',
  });
};

export { userGet, userPost, userPut, userPatch, userDelete };
