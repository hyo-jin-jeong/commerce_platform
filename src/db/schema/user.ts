import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8, max: 20 },
    name: { type: String, required: true, max: 16 },
    countryCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    agreeTerms: { type: Boolean, require: true, default: false },
  },
  { timestamps: true }
);
