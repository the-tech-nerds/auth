import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@technerds/common-services';
import { AuthorizationController } from './authorization.controller';
import {
  AccessCode, AccessToken,
  Client,
  PermissionCategories, Permissions, RoleHasPermissions, Roles, UserHasRoles,
} from './authorization.entity';
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
import { ApiResponseService } from '../utils/services/api-response/response/api-response.service';
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
    ]),
    CacheModule,
  ],
  providers: [
    CreatePermissionCategoryService,
    ListPermissionCategoryService,
    UpdatePermissionCategoryService,
    DeletePermissionCategoryService,

    CreateRoleService,
    ListRoleService,
    UpdateRoleService,
    DeleteRoleService,

    CreatePermissionService,
    ListPermissionService,
    UpdatePermissionService,
    DeletePermissionService,
    ApiResponseService,
    GetByIdPermissionService,

    CreateClientService,
    SerializeClientService,
    DeserializeClientService,
    GrantService,
    ExchangeService,
    AuthorizeService,
    TokenService,
    InitializeOauthServerService,
  ],
  controllers: [
    AuthorizationController,
    PermissionCategoryController,
    RoleController,
    PermissionController,
    OauthController,
  ],
})
export class AuthorizationModule {
}
