import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiResponseService } from '@the-tech-nerds/common-services';
@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly apiResponseService: ApiResponseService) {}

  catch(error: Error, host: ArgumentsHost): any {
    console.log(error);
    const response = host.switchToHttp().getResponse();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.BAD_REQUEST) {
      return this.apiResponseService.badRequestError([error.message], response);
    }

    if (status === HttpStatus.UNAUTHORIZED) {
      return this.apiResponseService.unAuthorizedError(
        [error.message],
        response,
      );
    }
    if (status === HttpStatus.FORBIDDEN) {
      return this.apiResponseService.forbiddenError([error.message], response);
    }
    if (status === HttpStatus.NOT_FOUND) {
      return this.apiResponseService.notFoundError([error.message], response);
    }

    return this.apiResponseService.internalServerError(
      [error.message],
      response,
    );
  }
}
