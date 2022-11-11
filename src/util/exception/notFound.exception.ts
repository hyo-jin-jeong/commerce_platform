import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(message: string = '리소스를 찾지 못했습니다.') {
    super(404, message);
  }
}
