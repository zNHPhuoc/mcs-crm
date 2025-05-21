import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'ERROR_SYSTEM';
    let error = [];

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      statusCode = exception.getStatus();

      if (
        typeof exceptionResponse === 'object' &&
        Array.isArray(exceptionResponse['message']) &&
        typeof exceptionResponse['error'] === 'string' &&
        exceptionResponse['error'] === 'Bad Request' &&
        statusCode === HttpStatus.BAD_REQUEST
      ) {
        return response.status(statusCode).json({
          status: false,
          statusCode,
          message: 'VALIDATION_FAILED',
          error: exceptionResponse['message'],
        });
      }

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        error = [exceptionResponse];
      } else if (typeof exceptionResponse === 'object') {
        const res: any = exceptionResponse;
        message = res.message || message;
        error = Array.isArray(res.message) ? res.message : [res.message];
      }
    }

    response.status(statusCode).json({
      status: false,
      statusCode,
      message,
      error,
    });
  }
}
