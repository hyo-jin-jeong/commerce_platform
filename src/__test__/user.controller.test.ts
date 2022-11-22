import { StubUserService } from './user.service.stub';
import { UserController } from '../controller/user';
import { UserService } from '../service/user';
import httpMock from 'node-mocks-http';

describe('user Controller unit test', () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(() => {
    userService = new StubUserService() as unknown as UserService;
    userController = new UserController(userService);
  });
  describe('signup test', () => {
    it('return 201 status and 성공 message', async () => {
      const request = httpMock.createRequest({
        url: '/user/signup',
        method: 'POST',
      });
      const response = httpMock.createResponse();
      await userController.signup(request, response);

      expect(response.statusCode).toBe(201);
      expect(response._getJSONData().message).toBe('성공');
    });
  });

  describe('login test', () => {
    it('return 200 status and 성공 message', async () => {
      const request = httpMock.createRequest({
        url: '/user/login',
        method: 'POST',
      });
      const response = httpMock.createResponse();
      await userController.login(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData().token).toBe('token');
    });
  });
});
