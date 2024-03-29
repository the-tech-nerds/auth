import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CacheModule,
  PermissionsGuard,
  ApiResponseService,
} from '@the-tech-nerds/common-services';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@the-tech-nerds/common-services/dist/guards/roles/roles.guard';
import { AuthorizationController } from './authorization.controller';
import { CreatePermissionCategoryService } from './services/permission-category/create-permision-category.service';
import { ListPermissionCategoryService } from './services/permission-category/list-permission-category.service';
import { UpdatePermissionCategoryService } from './services/permission-category/update-permission-category.service';
import { DeletePermissionCategoryService } from './services/permission-category/delete-permission-category.service';
import { CreateRoleService } from './services/role/create-role.service';
import { ListRoleService } from './services/role/list-role.service';
import { UpdateRoleService } from './services/role/update-role.service';
import { DeleteRoleService } from './services/role/delete-role.service';
import { CreatePermissionService } from './services/permission/create-permission.service';
import { ListPermissionService } from './services/permission/list-permission.service';
import { UpdatePermissionService } from './services/permission/update-permission.service';
import { DeletePermissionService } from './services/permission/delete-permission.service';
import { PermissionCategoryController } from './controllers/permission-category.controller';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';
import { GetByIdPermissionService } from './services/permission/getById-permission.service';
import { OauthController } from './controllers/oauth.controller';
import { CreateClientService } from './services/oauth/create-client.service';
import { SerializeClientService } from './services/oauth/serialize-client.service';
import { DeserializeClientService } from './services/oauth/deserialize-client.service';
import { GrantService } from './services/oauth/grant.service';
import { ExchangeService } from './services/oauth/exchange.service';
import { AuthorizeService } from './services/oauth/authorize.service';
import { InitializeOauthServerService } from './services/oauth/initialize-oauth-server.service';
import { TokenService } from './services/oauth/token.service';
import { PermissionCategories } from './entities/permission-category.entity';
import { Permissions } from './entities/permission.entity';
import { Roles } from './entities/role.entity';
import { Client } from './entities/client.entity';
import { AccessCode } from './entities/access-code.entity';
import { AccessToken } from './entities/access-token.entity';
import { GetByIdRoleService } from './services/role/get-by-id-role.service';
import { AssignPermissionInRoleService } from './services/role/assign-permission-in-role.service';
import { jwtConstants } from '../authentication/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionCategories,
      Permissions,
      Roles,
      Client,
      AccessCode,
      AccessToken,
    ]),
    CacheModule,
    HttpModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    ApiResponseService,
    CreatePermissionCategoryService,
    ListPermissionCategoryService,
    UpdatePermissionCategoryService,
    DeletePermissionCategoryService,

    CreateRoleService,
    ListRoleService,
    UpdateRoleService,
    DeleteRoleService,
    AssignPermissionInRoleService,
    CreatePermissionService,
    ListPermissionService,
    UpdatePermissionService,
    DeletePermissionService,
    GetByIdPermissionService,

    CreateClientService,
    SerializeClientService,
    DeserializeClientService,
    GrantService,
    ExchangeService,
    AuthorizeService,
    TokenService,
    InitializeOauthServerService,
    GetByIdRoleService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  controllers: [
    AuthorizationController,
    PermissionCategoryController,
    RoleController,
    PermissionController,
    OauthController,
  ],
})
export class AuthorizationModule {}
