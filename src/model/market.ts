import { marketSchema } from '../db/schema/market';
import mongoose from 'mongoose';

const Market = mongoose.model('Market', marketSchema);

const createMarket = async (
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
const getMarketByUserId = async (userId: string) => {
  return await Market.findOne({ userId });
};

export { createMarket, getMarketByUserId };
