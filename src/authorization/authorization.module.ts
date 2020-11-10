import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationController } from './authorization.controller';
import { PermissionCategories, Permissions, RoleHasPermissions, Roles, UserHasRoles } from './authorization.entity';
import { CreatePermissionCategoryService } from './services/permission/create-permision-category.service';
import { CreatePermissionService } from './services/permission/create-permission.service';
import { DeletePermissionCategoryService } from './services/permission/delete-permission-category.service';
import { DeletePermissionService } from './services/permission/delete-permission.service';
import { GetByIdPermissionCategoryService } from './services/permission/getById-permission-category.service';
import { GetByIdPermissionService } from './services/permission/getById-permission.service';
import { ListPermissionCategoryService } from './services/permission/list-permission-category.service';
import { ListPermissionService } from './services/permission/list-permission.service';
import { UpdatePermissionCategoryService } from './services/permission/update-permission-category.service';
import { UpdatePermissionService } from './services/permission/update-permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([
     PermissionCategories,
     Permissions, 
     Roles,
     RoleHasPermissions,
     UserHasRoles
    ]),
  ],
  providers: [
    CreatePermissionCategoryService, 
    ListPermissionCategoryService,
    UpdatePermissionCategoryService,
    GetByIdPermissionCategoryService,
    DeletePermissionCategoryService,
    CreatePermissionService,
    UpdatePermissionService,
    ListPermissionService,
    GetByIdPermissionService,
    DeletePermissionService
  ],
  controllers: [AuthorizationController]
})
export class AuthorizationModule {}
