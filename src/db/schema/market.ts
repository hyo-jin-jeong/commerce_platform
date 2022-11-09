import mongoose, { Schema } from 'mongoose';

export const marketSchema = new mongoose.Schema({
  marketName: { type: String, required: true, max: 10 },
  accountNumber: { type: String, required: true },
  accountName: { type: String, required: true },
  userId: { type: Number, required: true },
  productId: [Schema.Types.ObjectId],
});
