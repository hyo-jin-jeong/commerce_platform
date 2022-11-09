import { NextFunction, Request, Response } from 'express';

import { validationResult } from 'express-validator';

const validate = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  }
  res.status(400).json({ message: error.array()[0].msg });
};

export default validate;
