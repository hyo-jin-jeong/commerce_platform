import { Types } from 'mongoose';
import config from '../config';
import jwt from 'jsonwebtoken';

const createJsonWebToken = (id: Types.ObjectId) => {
  const token = jwt.sign({ id: String(id) }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresIn,
    issuer: 'admin',
  });
  return token;
};

export { createJsonWebToken };
