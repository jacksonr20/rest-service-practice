import { request, response } from 'express';

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Unable to verify role, the token must be validated first',
    });
  }

  const { role, name } = req.user;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not an admin`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'Unable to verify role, the token must be validated first',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service require one of these roles: ${roles}`,
      });
    }

    next();
  };
};

export { isAdminRole, hasRole };
