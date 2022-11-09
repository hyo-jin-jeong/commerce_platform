import { BadReqeustException } from '../util/exception/index';
import encryptPassword from '../util/encryptPassword';
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

export default { signup };
