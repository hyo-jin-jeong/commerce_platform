import * as marketRepository from '../model/market';
import * as productRepository from '../model/product';
import * as userRepository from '../model/user';

import {
  BadReqeustException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '../util/exception';

import { QueryOptions } from 'mongoose';

const SORT = {
  RECENT: 'recent',
  DEADLINE: 'deadline',
};
const productAccessPermissionCheck = async (id: string, userId: string) => {
  const product = await productRepository.getProductById(id);
  console.log(product?.userId, userId);
  if (!product) {
    throw new NotFoundException('NOT_FOUND');
  }
  if (product.userId !== userId) {
    throw new ForbiddenException('INVALID_PERMISSION');
  }
  return product;
};

const createMarket = async (
  userId: string,
  marketName: string,
  bank: string,
  accountNumber: string,
  accountName: string
) => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new UnauthorizedException('UNAUTHORIZED');
  }

  const market = await marketRepository.getMarketByUserId(userId);
  if (market) {
    throw new BadReqeustException('EXISTS_VALUE');
  }

  await marketRepository.createMarket(
    userId,
    user.name,
    marketName,
    bank,
    accountNumber,
    accountName
  );
};

const createProduct = async (userId: string, data: object) => {
  const market = await marketRepository.getMarketByUserId(userId);
  if (!market) {
    throw new ForbiddenException('INVALID_PERMISSION');
  }
  await productRepository.createProduct(userId, String(market._id), data);
};

const updateProduct = async (id: string, userId: string, data: object) => {
  await productAccessPermissionCheck(id, userId);
  await productRepository.updateProduct(id, data);
};

const deleteProduct = async (id: string, userId: string) => {
  await productAccessPermissionCheck(id, userId);
  await productRepository.deleteProduct(id);
};

const getProduct = async (id: string) => {
  return await productRepository.getProductById(id);
};

const getProducts = async (
  search: string | undefined,
  category: string | undefined,
  nation: string | undefined,
  sort: string | undefined
) => {
  const { query, sortValue } = createQueryOptions(
    search,
    category,
    nation,
    sort
  );
  return await productRepository.getProducts(query, sortValue);
};

const createQueryOptions = (
  search: string | undefined,
  category: string | undefined,
  nation: string | undefined,
  sort: string | undefined
) => {
  let query: QueryOptions = {};
  let categories, nations, sortValue;
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

export {
  createMarket,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
