import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleTypeEnum } from '../../enum/roles-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<{ roles: string[]; type: number }>(
      'has-roles',
      context.getHandler(),
    );
    console.log(roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    switch (roles.type) {
      case RoleTypeEnum.hasRole:
        console.log(1);
        break;
      case RoleTypeEnum.hasAnyRoles:
        console.log(2);

        break;
      case RoleTypeEnum.hasAllRoles:
        console.log(3);
        break;
      default:
        console.log(request);
        return true;
    }
    return false;
  }
}
