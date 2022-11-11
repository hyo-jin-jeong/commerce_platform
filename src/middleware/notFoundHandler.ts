import { Request, Response } from 'express';

const notFoundHandler = (req: Request, res: Response) => {
  res.status(400).json({ message: '잘못된 요청입니다.' });
};

export default notFoundHandler;
