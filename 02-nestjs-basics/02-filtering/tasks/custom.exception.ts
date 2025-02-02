import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from "@nestjs/common";

@Catch(NotFoundException)
export class CustomNotFoundFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = HttpStatus.BAD_REQUEST;
    const message = exception.getResponse();

    response.status(status).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message,
    });
  }
}
