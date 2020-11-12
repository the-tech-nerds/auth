import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationController } from './authorization.controller';
import { PermissionCategories, Permissions, RoleHasPermissions, Roles, UserHasRoles } from './authorization.entity';
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
import { ApiResponseService } from '../share/services/api-response/response/api-response.service';
import { GetByIdPermissionService } from './services/permission/getById-permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    PermissionCategories,
    Permissions,
    Roles,
    RoleHasPermissions,
    UserHasRoles,
  ]),
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
    GetByIdPermissionService
  ],
  controllers: [
    AuthorizationController,
    PermissionCategoryController,
    RoleController,
    PermissionController,

  ],
})
export class AuthorizationModule {
}
