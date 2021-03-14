import {
  ApiResponseModule,
  CacheModule,
  commonConfig,
} from '@the-tech-nerds/common-services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { routes } from './route';
import { AuthenticationModule } from './authentication/authentication.module';
import { AddressModule } from './address/address.module';
import { OtpModule } from './otp/otp.module';
import configuration from './config/configuration';
import loginConfig from './config/login-config';
import { PasswordModule } from './password/password.module';

// @ts-ignore
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, commonConfig, loginConfig],
    }),
    RouterModule.forRoutes(routes),
    UserModule,
    AddressModule,
    AuthorizationModule,
    AuthenticationModule,
    OtpModule,
    PasswordModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt_secret'),
        signOptions: { expiresIn: configService.get('jwt_expiration') },
      }),
      inject: [ConfigService],
    }),
    CacheModule,
    ApiResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
