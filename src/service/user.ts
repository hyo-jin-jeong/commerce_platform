import {
  BadReqeustException,
  UnauthorizedException,
} from '../util/exception/index';
import { encryptPassword, isSamePassword } from '../util/encryptPassword';

import { createJsonWebToken } from '../util/createJsonWebToken';
import userRepository from '../model/user';

const signup = async (
  email: string,
  password: string,
  name: string,
  countryCode: string,
  phoneNumber: string,
  agreeTerms: boolean
) => {
  const user = await userRepository.getUserByEmail(email);
  if (user) {
    throw new BadReqeustException('DUPLICATED_VALUE');
  }
  const hashedPassword = await encryptPassword(password);

  await userRepository.createUser({
    email,
    password: hashedPassword,
    name,
    countryCode,
    phoneNumber,
    agreeTerms,
  });
};

const login = async (email: string, password: string) => {
  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw new UnauthorizedException('UNAUTHORIZED');
  }
  if (!(await isSamePassword(password, user.password))) {
    throw new UnauthorizedException('UNAUTHORIZED');
  }
  return createJsonWebToken(user._id);
};

export default { signup, login };
