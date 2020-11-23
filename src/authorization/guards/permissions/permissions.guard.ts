import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionTypeEnum } from '../../enum/permission-type.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<{
      permissions: string[];
      type: number;
    }>('has-permissions', context.getHandler());
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    switch (permissions.type) {
      case PermissionTypeEnum.hasPermission:
        console.log(1);
        break;
      case PermissionTypeEnum.hasAnyPermissions:
        console.log(2);
        break;
      case PermissionTypeEnum.hasAllPermissions:
        console.log(3);
        break;
      default:
        console.log(request);
        return true;
    }
    return false;
  }
}
