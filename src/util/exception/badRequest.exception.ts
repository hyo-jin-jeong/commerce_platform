import { HttpException } from './http.exception';

export class BadReqeustException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}
