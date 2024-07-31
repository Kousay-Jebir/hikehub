import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = 'An error occurred';
    if (typeof exceptionResponse === 'object' && exceptionResponse.hasOwnProperty('message')) {
      message = (exceptionResponse as any).message;
    }

    response
      .status(status)
      .json({
        statusCode: status,
        path: request.url,
        message,
      });
  }
}
