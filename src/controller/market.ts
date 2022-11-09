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

const updateProduct = async (req: Request, res: Response) => {
  const userId = req.userId;
  const id = req.params.id;
  const data = req.body;

  await marketService.updateProduct(id, userId!, data);

  res.status(201).json({ message: 'SUCCESS' });
};

const deleteProduct = async (req: Request, res: Response) => {
  const userId = req.userId;
  const id = req.params.id;

  await marketService.deleteProduct(id, userId!);

  res.status(200).json({ message: 'SUCCESS' });
};

const getProduct = async (req: Request, res: Response) => {
  let result = null;
  const id = req.params.id;

  const product = await marketService.getProduct(id);

  if (product) {
    const { userId, marketId, ...data } = product.toObject();
    result = data;
  }

  res.status(200).json({ data: result });
};

export {
  createMarket,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
