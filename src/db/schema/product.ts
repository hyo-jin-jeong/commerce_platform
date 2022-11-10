import mongoose from 'mongoose';

const optionsSchema = new mongoose.Schema({
  type: { type: String, max: 10 },
  name: { type: String, max: 20 },
  stock: { type: Number, max: 100 },
});
const productImgSchema = new mongoose.Schema({
  id: { type: Number, max: 8 },
  url: String,
});
const productDetailSchema = new mongoose.Schema({
  type: { type: String, enum: ['video', 'image'] },
  url: String,
  info: String,
});
const deliveryInfoSchema = new mongoose.Schema({
  country: String,
  dueDate: Date,
  type: { type: String, enum: ['inkorea', 'abroad', 'direact'] },
  price: Number,
  bundle: Boolean,
  sendDate: Date,
});

export const productSchema = new mongoose.Schema(
  {
    productName: { type: String, requried: true, min: 80 },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    productInfo: { type: String, required: true },
    purchaseDate: { type: Date },
    price: { type: Number, required: true },
    optionType: { type: String, enum: ['single', 'group'] },
    optionList: [optionsSchema],
    productImg: [productImgSchema],
    productDetail: [productDetailSchema],
    deliveryInfo: deliveryInfoSchema,
    userId: { type: String, required: true },
    marketId: { type: String, require: true },
  },
  { timestamps: true }
);
