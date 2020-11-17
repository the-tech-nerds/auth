import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ErrorFilter } from './filters/error.filter';
import { ApiResponseService } from './utils/services/api-response/response/api-response.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1');
  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useGlobalFilters(new ErrorFilter(new ApiResponseService()));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
