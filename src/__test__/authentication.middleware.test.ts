import jwt, { JsonWebTokenError, verify } from 'jsonwebtoken';

import { UnauthorizedException } from '../util/exception';
import authentication from '../middleware/authentication';
import httpMock from 'node-mocks-http';

jest.mock('jsonwebtoken');
describe('authentication Middleware unit test', () => {
  it('return next()', () => {
    const request = httpMock.createRequest({
      headers: { authorization: 'Bearer token' },
    });
    const response = httpMock.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn().mockReturnValue({ userId: 1 });

    authentication(request, response, next);

    expect(next).toBeCalledTimes(1);
  });

  it('throw UnauthorizedException 토근이 없을 때', () => {
    const request = httpMock.createRequest({
      headers: {},
    });
    const response = httpMock.createResponse();
    const next = jest.fn();

    expect(() => {
      authentication(request, response, next);
    }).toThrow(UnauthorizedException);
  });

  it('throw UnauthorizedException 토큰이 유효하지 않을 때', () => {
    const request = httpMock.createRequest({
      headers: { authorization: 'Bearer token' },
    });
    const response = httpMock.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn(() => {
      throw new JsonWebTokenError('jsonwebtoken error');
    });

    expect(() => {
      authentication(request, response, next);
    }).toThrow(UnauthorizedException);
  });
});
