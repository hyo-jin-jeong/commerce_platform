import { BadReqeustException, UnauthorizedException } from '../util/exception';

import { UserRepository } from '../model/user';
import { UserService } from '../service/user';
import { createJsonWebToken } from '../util/createJsonWebToken';
import { faker } from '@faker-js/faker';

jest.mock('../util/encryptPassword.ts');
jest.mock('../util/createJsonWebToken.ts', () => {
  return {
    createJsonWebToken: jest.fn(() => {
      return 'token';
    }),
  };
});
const mockEncrypt = jest.requireMock('../util/encryptPassword.ts');
describe('user Service unit test', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let email: string,
    password: string,
    name: string,
    countryCode: string,
    phoneNumber: string,
    agreeTerms: boolean;
  beforeEach(() => {
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
    email = faker.internet.email();
    password = faker.internet.password();
    name = faker.internet.userName();
    countryCode = faker.address.countryCode();
    phoneNumber = faker.phone.number();
    agreeTerms = true;
  });

  describe('signup test', () => {
    it('return void', async () => {
      userRepository.getUserByEmail = jest.fn();
      mockEncrypt.encryptPassword = jest.fn(() => 'hashedpassword');
      userRepository.createUser = jest.fn();

      const result = await userService.signup(
        email,
        password,
        name,
        countryCode,
        phoneNumber,
        agreeTerms
      );

      expect(result).toBe(undefined);
      expect(userRepository.getUserByEmail).toBeCalledTimes(1);
      expect(mockEncrypt.encryptPassword).toBeCalledTimes(1);
      expect(userRepository.createUser).toBeCalledTimes(1);
    });

    it('throw BadRequestException user가 존재할 때', async () => {
      userRepository.getUserByEmail = jest.fn().mockReturnValue({ userId: 1 });

      expect(async () => {
        await userService.signup(
          email,
          password,
          name,
          countryCode,
          phoneNumber,
          agreeTerms
        );
      }).rejects.toThrowError(BadReqeustException);
    });
  });

  describe('login test', () => {
    it('return token', async () => {
      userRepository.getUserByEmail = jest.fn().mockReturnValue({ _id: 1 });
      mockEncrypt.isSamePassword = jest.fn(() => true);

      const result = await userService.login(email, password);

      expect(result).toBe('token');
      expect(userRepository.getUserByEmail).toBeCalledTimes(1);
      expect(mockEncrypt.isSamePassword).toBeCalledTimes(1);
      expect(createJsonWebToken).toBeCalledTimes(1);
    });

    it('throw UnauthorizedException user가 없을 때', async () => {
      userRepository.getUserByEmail = jest.fn();

      expect(async () => {
        await userService.login(email, password);
      }).rejects.toThrowError(UnauthorizedException);
    });

    it('throw UnauthorizedException password가 일치하지 않을 때', async () => {
      userRepository.getUserByEmail = jest.fn().mockReturnValue({ _id: 1 });
      mockEncrypt.isSamePassword = jest.fn(() => false);

      expect(async () => {
        await userService.login(email, password);
      }).rejects.toThrowError(UnauthorizedException);
    });
  });
});
