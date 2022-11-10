import * as marketRepository from '../model/market';
import * as userRepository from '../model/user';

import { BadReqeustException, UnauthorizedException } from '../util/exception';

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

export { createMarket };
