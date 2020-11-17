import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@technerds/common-services';
import {
  AccessCode, AccessToken,
  Client,
  PermissionCategories,
  Permissions,
  RoleHasPermissions,
  Roles,
  UserHasRoles,
} from '../authorization/authorization.entity';
import { AuthenticationController } from './controllers/authentication.controller';
import { UserRegistrationService } from './services/user.registration.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { ApiResponseService } from '../utils/services/api-response/response/api-response.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionCategories,
      Permissions,
      Roles,
      RoleHasPermissions,
      UserHasRoles,
      Client,
      AccessCode,
      AccessToken,
      User,
    ]),
    CacheModule,
    UserModule,
  ],
  providers: [
    UserRegistrationService,
    ApiResponseService,
  ],
  controllers: [
    AuthenticationController,
  ],
})
export class AuthenticationModule {}
