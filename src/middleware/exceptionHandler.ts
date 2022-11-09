import { NextFunction, Request, Response } from 'express';

const exceptionHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status;
  const message = err.message;
  if (err.status) {
    return res.status(status).json({ message });
  }
  next(err);
};

export default exceptionHandler;
