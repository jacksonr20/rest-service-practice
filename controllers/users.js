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

  // Hash password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save
  await user.save();

  res.json({
    user,
  });
};

const userPut = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: 'put API - Controller',
    id,
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
