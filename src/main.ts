import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
console.log('arif');
// eslint-disable-next-line @typescript-eslint/no-use-before-define,no-void
void bootstrap();
