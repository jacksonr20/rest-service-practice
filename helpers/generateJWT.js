import jwt from 'jsonwebtoken';

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEYJWT,
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Token could not be generated');
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generateJWT };
