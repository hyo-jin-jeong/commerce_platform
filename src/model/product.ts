import mongoose, { Query, QueryOptions } from 'mongoose';

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

const getProductById = async (id: string) => {
  return await Product.findById(id);
};

const updateProduct = async (id: string, data: object) => {
  await Product.updateOne({ _id: id }, { ...data });
};

const deleteProduct = async (id: string) => {
  await Product.deleteOne({ _id: id });
};

const getProducts = async (query: QueryOptions, sortValue: any) => {
  return await Product.find({ ...query }).sort(sortValue);
};

export {
  OPTION_TYPE,
  DELIVERY_TYPE,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProducts,
};
