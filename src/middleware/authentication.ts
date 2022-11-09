import { NextFunction, Request, Response } from 'express';

import { UnauthorizedException } from '../util/exception';
import config from '../config';
import jwt from 'jsonwebtoken';
import { logger } from '../logger/logger';

const authentication = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    const decoded = jwt.verify(token, config.jwt.secretKey);
    req.userId = (decoded as any)?.userId;

    return next();
  } catch (err) {
    logger.error(err);
    throw new UnauthorizedException('UNAUTHORIZED');
  }
};

export default authentication;
