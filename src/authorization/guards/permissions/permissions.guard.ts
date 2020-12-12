import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PermissionTypeEnum } from '../../enum/permission-type.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const permissions = this.reflector.get<{
        permissions: string[];
        type: number;
      }>('has-permissions', context.getHandler());
      if (!permissions) {
        return true;
      }
      // @todo get token from user request that comment below
      // const request = context.switchToHttp().getRequest();

      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNha2liM0BnbWFpbC5jb20iLCJpZCI6MSwicm9sZXMiOlt7ImlkIjoxLCJuYW1lIjoiQWRtaW4ifV0sInBlcm1pc3Npb25zIjpbeyJpZCI6MSwibmFtZSI6IlByb2R1Y3QgVmlldyJ9XSwiaWF0IjoxNjA2MjQwMDU3LCJleHAiOjE2MDYyNDM2NTd9.ONmFOyQiGBxqCvwnoT_oTdS2atQZLBRTBClTAbQwIno';
      const tokenPayload = this.jwtService.decode(token);
      // @ts-ignore

      const userPermissions = tokenPayload.permissions.map(
        (permission: any) => permission.name,
      );
      const systemPermission = permissions.permissions;
      switch (permissions.type) {
        case PermissionTypeEnum.hasPermission:
          return this.hasPermission(systemPermission, userPermissions);
        case PermissionTypeEnum.hasAnyPermissions:
          return this.hasAnyPermissions(systemPermission, userPermissions);
        case PermissionTypeEnum.hasAllPermissions:
          return this.hasAllPermission(systemPermission, userPermissions);
        default:
          return true;
      }
    } catch (e) {
      return false;
    }
  }

  hasAnyPermissions(systemPermissions: string[], userPermissions: string[]) {
    let permissionMatch = false;
    try {
      for (let i = 0; i <= userPermissions.length; i += 1) {
        for (let j = 0; j < systemPermissions.length; j += 1) {
          if (userPermissions[i] === systemPermissions[j]) {
            permissionMatch = true;
            break;
          }
        }
      }
      permissionMatch = false;
    } catch (e) {
      throw new UnauthorizedException('Unauthenticated request');
    }
    if (!permissionMatch) {
      throw new UnauthorizedException('Unauthenticated request');
    }
    return true;
  }

  hasPermission(systemPermissions: string[], userPermissions: string[]) {
    let permissionMatch = -1;
    try {
      permissionMatch = userPermissions.findIndex(
        (permission: string) => permission === systemPermissions[0],
      );
    } catch (e) {
      throw new UnauthorizedException('Unauthenticated request');
    }
    if (permissionMatch === -1) {
      throw new UnauthorizedException('Unauthenticated request');
    }
    return true;
  }

  hasAllPermission(systemPermissions: string[], userPermissions: string[]) {
    let permissionMatch = false;
    try {
      permissionMatch =
        JSON.stringify(userPermissions) !== JSON.stringify(systemPermissions);
    } catch (e) {
      throw new UnauthorizedException('Unauthenticated request');
    }
    if (!permissionMatch) {
      throw new UnauthorizedException('Unauthenticated request');
    }
    return true;
  }
}
