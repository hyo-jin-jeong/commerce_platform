import { HttpException } from './http.exception';

export class ForbiddenException extends HttpException {
  constructor(message: string = '권한이 없습니다') {
    super(403, message);
  }
}
