import { HttpException } from './http.exception';

export class BadReqeustException extends HttpException {
  constructor(message: string = '잘못된 요청입니다.') {
    super(400, message);
  }
}
