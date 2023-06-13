import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionReponse = exception.getResponse();

    const error =
      typeof response === 'string'
        ? { message: exceptionReponse }
        : (exceptionReponse as object);

    const customHttpExceptionResponse = {
      success: 0,
      ...error,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(customHttpExceptionResponse);
  }
}
