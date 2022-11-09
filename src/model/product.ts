import mongoose from 'mongoose';
import { productSchema } from '../db/schema/product';

const OPTION_TYPE = {
  SINGLE: 'single',
  GROUP: 'group',
};
const DELIVERY_TYPE = {
  IN_KOREA: 'inkorea',
  ABROAD: 'abroad',
  DIREACT: 'direact',
};
const Product = mongoose.model('Product', productSchema);

const createProduct = async (
  userId: string,
  marketId: string,
  data: object
) => {
  const product = new Product({
    userId,
    marketId,
    ...data,
  });
  await product.save();
};
export { OPTION_TYPE, DELIVERY_TYPE, createProduct };
