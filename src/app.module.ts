import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { routes } from './route';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RouterModule.forRoutes(routes),
    UserModule,
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
