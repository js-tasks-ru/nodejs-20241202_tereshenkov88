import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CustomNotFoundFilter } from "./tasks/custom.exception";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomNotFoundFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
