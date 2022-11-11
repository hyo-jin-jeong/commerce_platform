import { marketSchema } from '../db/schema/market';
import mongoose from 'mongoose';

const Market = mongoose.model('Market', marketSchema);

export class MarketRepository {
  createMarket = async (
    userId: string,
    userName: string,
    marketName: string,
    bank: string,
    accountNumber: string,
    accountName: string
  ) => {
    const market = new Market({
      userId,
      userName,
      marketName,
      bank,
      accountNumber,
      accountName,
    });
    await market.save();
  };

  getMarketByUserId = async (userId: string) => {
    return await Market.findOne({ userId });
  };
}
