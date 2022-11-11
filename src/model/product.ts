import mongoose, { Query, QueryOptions } from 'mongoose';

import { productSchema } from '../db/schema/product';

export const OPTION_TYPE = {
  SINGLE: 'single',
  GROUP: 'group',
};
export const DELIVERY_TYPE = {
  IN_KOREA: 'inkorea',
  ABROAD: 'abroad',
  DIREACT: 'direact',
};

const SORT = {
  RECENT: 'recent',
  DEADLINE: 'deadline',
};

const Product = mongoose.model('Product', productSchema);

export class ProductRepository {
  createProduct = async (userId: string, marketId: string, data: object) => {
    const product = new Product({
      userId,
      marketId,
      ...data,
    });
    await product.save();
  };

  getProductById = async (id: string) => {
    return await Product.findById(id);
  };

  updateProduct = async (id: string, data: object) => {
    await Product.updateOne({ _id: id }, { ...data });
  };

  deleteProduct = async (id: string) => {
    await Product.deleteOne({ _id: id });
  };

  getProducts = async (
    search: string | undefined,
    category: string | undefined,
    nation: string | undefined,
    sort: string | undefined
  ) => {
    const { query, sortValue } = this.createQueryOptions(
      search,
      category,
      nation,
      sort
    );
    return await Product.find({ ...query }).sort(sortValue as any);
  };

  createQueryOptions = (
    search: string | undefined,
    category: string | undefined,
    nation: string | undefined,
    sort: string | undefined
  ) => {
    let query: QueryOptions = {};
    let categories, nations;
    let sortValue: object = { createdAt: -1 };

    if (search) {
      query['productName'] = search;
    }
    if (category) {
      categories = JSON.parse(category);
      query['$or'] = categories;
    }
    if (nation) {
      nations = JSON.parse(nation);
      query['deliveryInfo.country'] = { $in: nations };
    }
    if (sort) {
      if (sort === SORT.RECENT) {
        sortValue = { createdAt: -1 };
      } else if (sort === SORT.DEADLINE) {
        sortValue = { 'deliveryInfo.dueDate': 1 };
      }
    }

    return { query, sortValue };
  };
}
