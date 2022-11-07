import { Request, Response } from 'express';

const notFoundHandler = (req: Request, res: Response) => {
  res.status(400).json({ message: 'NOT FOUND' });
};

export default notFoundHandler;
