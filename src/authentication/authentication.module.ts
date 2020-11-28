import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@technerds/common-services';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from './controllers/authentication.controller';
import { UserRegistrationService } from './services/user.registration.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { ApiResponseService } from '../utils/services/api-response/response/api-response.service';
import { PermissionCategories } from '../authorization/entities/permission-category.entity';
import { Permissions } from '../authorization/entities/permission.entity';
import { Roles } from '../authorization/entities/role.entity';
import { Client } from '../authorization/entities/client.entity';
import { AccessCode } from '../authorization/entities/access-code.entity';
import { AccessToken } from '../authorization/entities/access-token.entity';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserLoginService } from './services/user.login.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserValidationService } from './services/user.validation.service';
import { FetchUserByIdService } from '../user/services/fetch-user-by-id.service';

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
    ]),
    CacheModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    ApiResponseService,
    UserRegistrationService,
    UserLoginService,
    UserValidationService,
    LocalStrategy,
    JwtStrategy,
    FetchUserByIdService,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
