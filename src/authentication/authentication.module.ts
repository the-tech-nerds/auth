import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CacheModule,
  ApiResponseService,
} from '@the-tech-nerds/common-services';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationController } from './controllers/authentication.controller';
import { UserRegistrationService } from './services/user.registration.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { PermissionCategories } from '../authorization/entities/permission-category.entity';
import { Permissions } from '../authorization/entities/permission.entity';
import { Roles } from '../authorization/entities/role.entity';
import { Client } from '../authorization/entities/client.entity';
import { AccessCode } from '../authorization/entities/access-code.entity';
import { AccessToken } from '../authorization/entities/access-token.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserLoginService } from './services/user.login.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserValidationService } from './services/user.validation.service';
import { FetchUserByIdService } from '../user/services/fetch-user-by-id.service';
import { UserLogoutService } from './services/user.logout.service';
import { FetchUserInfoByEmailService } from '../user/services/fetch-user-by-email.service';
import { LoginHistories } from '../login-history/entities/login-history.entity';
import { LoginHistoryModule } from '../login-history/login-history.module';
import { InsertLoginHistoryService } from '../login-history/services/insert-login-history.service';
import { UserVerifyActionService } from './services/user.verify-action.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionCategories,
      Permissions,
      Roles,
      Client,
      AccessCode,
      AccessToken,
      User,
      LoginHistories,
    ]),
    CacheModule,
    UserModule,
    PassportModule,
    LoginHistoryModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt_secret'),
        signOptions: { expiresIn: configService.get('jwt_expiration') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    UserRegistrationService,
    UserLoginService,
    UserLogoutService,
    UserValidationService,
    UserVerifyActionService,
    LocalStrategy,
    JwtStrategy,
    FetchUserByIdService,
    FetchUserInfoByEmailService,
    InsertLoginHistoryService,
    ApiResponseService,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
