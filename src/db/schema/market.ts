import mongoose, { Schema } from 'mongoose';

export const marketSchema = new mongoose.Schema({
  marketName: { type: String, required: true, max: 10 },
  bank: { type: String, reqired: true },
  accountNumber: { type: String, required: true },
  accountName: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, reqired: true },
  productId: [String],
});
