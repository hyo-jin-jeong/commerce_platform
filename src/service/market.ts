import { BadReqeustException, UnauthorizedException } from '../util/exception';

import { MarketRepository } from '../model/market';
import { UserRepository } from '../model/user';

export class MarketService {
  private marketRepository;
  private userRepository;
  constructor(
    marketRepository: MarketRepository,
    userRepository: UserRepository
  ) {
    this.marketRepository = marketRepository;
    this.userRepository = userRepository;
  }
  createMarket = async (
    userId: string,
    marketName: string,
    bank: string,
    accountNumber: string,
    accountName: string
  ) => {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    const market = await this.marketRepository.getMarketByUserId(userId);
    if (market) {
      throw new BadReqeustException();
    }

    await this.marketRepository.createMarket(
      userId,
      user.name,
      marketName,
      bank,
      accountNumber,
      accountName
    );
  };
}
