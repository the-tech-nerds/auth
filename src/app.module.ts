import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { routes } from './route';
import { AuthenticationModule } from './authentication/authentication.module';
import { AddressModule } from './address/address.module';
import { OtpModule } from './otp/otp.module';

// @ts-ignore
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RouterModule.forRoutes(routes),
    UserModule,
    AddressModule,
    AuthorizationModule,
    AuthenticationModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
