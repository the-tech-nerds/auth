import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import {
  setBootstrap,
  ApiResponseService,
} from '@the-tech-nerds/common-services';
import { join } from 'path';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { ErrorFilter } from './filters/error.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await setBootstrap(app);

  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useStaticAssets(
    join(__dirname, 'notifications', 'email', 'templates', 'assets'),
  );
  app.setBaseViewsDir(join(__dirname, 'notification', 'email', 'templates'));
  app.setViewEngine('hbs');

  app.useGlobalFilters(new ErrorFilter(new ApiResponseService()));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(3000);
}

// eslint-disable-next-line @typescript-eslint/no-use-before-define,no-void
void bootstrap();
