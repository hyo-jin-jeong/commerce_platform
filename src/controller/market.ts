import * as marketService from '../service/market';

import { Request, Response } from 'express';

const createMarket = async (req: Request, res: Response) => {
  const { marketName, bank, accountNumber, accountName } = req.body;
  const userId = req.userId;

  await marketService.createMarket(
    userId!,
    marketName,
    bank,
    accountNumber,
    accountName
  );
  res.status(201).json({ message: 'SUCCESS' });
};

const createProduct = async (req: Request, res: Response) => {
  const userId = req.userId;
  const data = req.body;

  await marketService.createProduct(userId!, data);

  res.status(201).json({ message: 'SUCCESS' });
};

export { createMarket, createProduct };