import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";

@Catch(NotFoundException)
export class CustomNotFoundFilter implements ExceptionFilter {
  catch(_: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
