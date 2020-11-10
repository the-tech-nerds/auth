import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationController } from './authorization.controller';
import { PermissionCategories, Permissions, RoleHasPermissions, Roles, UserHasRoles } from './authorization.entity';
import { CreatePermissionCategoryService } from './services/permission/create-permision-category.service';
import { ListPermissionCategoryService } from './services/permission/list-permission-category.service';
import { UpdatePermissionCategoryService } from './services/permission/update-permission-category.service';

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
    UpdatePermissionCategoryService
  ],
  controllers: [AuthorizationController]
})
export class AuthorizationModule {}
