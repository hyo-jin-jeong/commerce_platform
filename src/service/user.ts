import {
  BadReqeustException,
  UnauthorizedException,
} from '../util/exception/index';
import { encryptPassword, isSamePassword } from '../util/encryptPassword';

import { UserRepository } from '../model/user';
import { createJsonWebToken } from '../util/createJsonWebToken';

export class UserService {
  private userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  signup = async (
    email: string,
    password: string,
    name: string,
    countryCode: string,
    phoneNumber: string,
    agreeTerms: boolean
  ) => {
    const user = await this.userRepository.getUserByEmail(email);
    if (user) {
      throw new BadReqeustException('존재하는 email입니다.');
    }
    const hashedPassword = await encryptPassword(password);

    await this.userRepository.createUser({
      email,
      password: hashedPassword,
      name,
      countryCode,
      phoneNumber,
      agreeTerms,
    });
  };

  login = async (email: string, password: string) => {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(await isSamePassword(password, user.password))) {
      throw new UnauthorizedException();
    }
    return createJsonWebToken(user._id);
  };
}
