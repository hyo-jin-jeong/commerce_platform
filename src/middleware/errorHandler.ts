import { NextFunction, Request, Response } from 'express';

import { logger } from '../logger/logger';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  res.status(500).json({ message: 'SERVER_ERROR' });
};

export default errorHandler;
