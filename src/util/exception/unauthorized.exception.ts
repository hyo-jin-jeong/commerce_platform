import { HttpException } from './http.exception';

export class UnauthorizedException extends HttpException {
  constructor(message: string = '인증되지 않았습니다.') {
    super(401, message);
  }
}
