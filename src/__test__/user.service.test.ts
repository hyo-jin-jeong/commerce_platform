import * as encrypt from '../util/encryptPassword';
import * as userRepository from '../model/user';
import * as userService from '../service/user';

import { BadReqeustException, UnauthorizedException } from '../util/exception';

import { createJsonWebToken } from '../util/createJsonWebToken';
import { faker } from '@faker-js/faker';

jest.mock('../model/user');
describe('user service unit test', () => {
  describe('signup test', () => {
    let email: string,
      password: string,
      name: string,
      countryCode: string,
      phoneNumber: string,
      agreeTerms: boolean;

    beforeEach(() => {
      email = faker.internet.email();
      password = faker.internet.password();
      name = faker.name.fullName();
      countryCode = faker.address.countryCode();
      phoneNumber = faker.phone.number();
      agreeTerms = true;
    });

    it('signup success', async () => {
      (encrypt.encryptPassword as jest.Mock) = jest.fn(() => password);
      await userService.signup(
        email,
        password,
        name,
        countryCode,
        phoneNumber,
        agreeTerms
      );

      expect(userRepository.getUserByEmail).toBeCalledTimes(1);
      expect(userRepository.getUserByEmail).toBeCalledWith(email);
      expect(userRepository.createUser).toBeCalledTimes(1);
      expect(userRepository.createUser).toBeCalledWith({
        email,
        password,
        name,
        countryCode,
        phoneNumber,
        agreeTerms,
      });
    });

    it('signup fail 해당 이메일로 이미 user가 있는 경우', async () => {
      (userRepository.getUserByEmail as jest.Mock) = jest.fn(() => {
        return { user: '' };
      });
      expect(async () => {
        await userService.signup(
          email,
          password,
          name,
          countryCode,
          phoneNumber,
          agreeTerms
        );
      }).rejects.toThrow(BadReqeustException);
    });
  });

  describe('login test', () => {
    let email: string, password: string;

    beforeEach(() => {
      email = faker.internet.email();
      password = faker.internet.password();
    });

    it('login success', async () => {
      const user = { password, _id: 1 };
      (userRepository.getUserByEmail as jest.Mock) = jest.fn(() => user);
      (encrypt.isSamePassword as jest.Mock) = jest.fn(() => true);
      (createJsonWebToken as jest.Mock) = jest.fn();
      await userService.login(email, password);

      expect(userRepository.getUserByEmail).toBeCalledTimes(1);
      expect(userRepository.getUserByEmail).toBeCalledWith(email);
      expect(createJsonWebToken).toBeCalledTimes(1);
      expect(createJsonWebToken).toBeCalledWith(user._id);
    });

    it('signup fail 해당 이메일 user가 없는 경우', async () => {
      (userRepository.getUserByEmail as jest.Mock) = jest.fn();
      expect(async () => {
        await userService.login(email, password);
      }).rejects.toThrow(UnauthorizedException);
    });

    it('signup fail 비밀번호가 다를 경우', async () => {
      const user = { password, _id: 1 };
      expect(async () => {
        (userRepository.getUserByEmail as jest.Mock) = jest.fn(() => user);
        (encrypt.isSamePassword as jest.Mock) = jest.fn(() => false);
        await userService.login(email, password);
      }).rejects.toThrow(UnauthorizedException);
    });
  });
});
