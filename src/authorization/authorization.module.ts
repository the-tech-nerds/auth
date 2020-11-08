import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationController } from './authorization.controller';
import { PermissionCategories, Permissions, RoleHasPermissions, Roles, UserHasRoles } from './authorization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
     PermissionCategories,
     Permissions, 
     Roles,
     RoleHasPermissions,
     UserHasRoles
    ])],
  controllers: [AuthorizationController]
})
export class AuthorizationModule {}
