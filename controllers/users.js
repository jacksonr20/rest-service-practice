import { response, request } from 'express';

const userGet = (req = request, res = response) => {
  const { q, name = 'No name', apiKey } = req.query;

  res.json({
    msg: 'get API - Controller',
    q,
    name,
    apiKey,
  });
};

const userPost = (req = request, res = response) => {
  const { name, age } = req.body;

  res.json({
    msg: 'post API - Controller',
    name,
    age,
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
