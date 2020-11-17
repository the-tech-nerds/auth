import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@technerds/common-services';
import { AuthenticationController } from './controllers/authentication.controller';
import { UserRegistrationService } from './services/user.registration.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { ApiResponseService } from '../utils/services/api-response/response/api-response.service';
import { PermissionCategories } from '../authorization/entities/permission-category.entity';
import { Permissions } from '../authorization/entities/permission.entity';
import { Roles } from '../authorization/entities/role.entity';
import { RoleHasPermissions } from '../authorization/entities/role-has-permission.entity';
import { UserHasRoles } from '../authorization/entities/user-has-role.entity';
import { Client } from '../authorization/entities/client.entity';
import { AccessCode } from '../authorization/entities/access-code.entity';
import { AccessToken } from '../authorization/entities/access-token.entity';

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
  providers: [UserRegistrationService, ApiResponseService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
