import { Request, Response } from 'express';

import { MarketService } from '../service/market';

export class MarketController {
  private marketService;

  constructor(marketService: MarketService) {
    this.marketService = marketService;
  }
  createMarket = async (req: Request, res: Response) => {
    const { marketName, bank, accountNumber, accountName } = req.body;
    const userId = req.userId;

    await this.marketService.createMarket(
      userId!,
      marketName,
      bank,
      accountNumber,
      accountName
    );
    res.status(201).json({ message: '성공' });
  };
}
