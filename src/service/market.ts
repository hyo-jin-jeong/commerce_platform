import * as marketRepository from '../model/market';
import * as productRepository from '../model/product';
import * as userRepository from '../model/user';

import {
  BadReqeustException,
  ForbiddenException,
  UnauthorizedException,
} from '../util/exception';

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
  let market = await marketRepository.getMarketByUserId(userId);
  if (!market) {
    throw new ForbiddenException('INVALID_PERMISSION');
  }
  await productRepository.createProduct(userId, String(market._id), data);
};

export { createMarket, createProduct };
