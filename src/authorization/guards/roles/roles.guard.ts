import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RoleTypeEnum } from '../../enum/roles-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<{ roles: string[]; type: number }>(
      'has-roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    // @todo get token from user request that comment below
    // const request = context.switchToHttp().getRequest();
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNha2liM0BnbWFpbC5jb20iLCJpZCI6MSwicm9sZXMiOlt7ImlkIjoxLCJuYW1lIjoiQWRtaW4ifV0sInBlcm1pc3Npb25zIjpbeyJpZCI6MSwibmFtZSI6IlByb2R1Y3QgVmlldyJ9XSwiaWF0IjoxNjA2MjQwMDU3LCJleHAiOjE2MDYyNDM2NTd9.ONmFOyQiGBxqCvwnoT_oTdS2atQZLBRTBClTAbQwIno';
    const tokenPayload = this.jwtService.decode(token);
    // @ts-ignore
    const userRoles = tokenPayload.roles.map(role => role.name);
    const systemRoles = roles.roles;
    switch (roles.type) {
      case RoleTypeEnum.hasRole:
        return this.hasRole(systemRoles, userRoles);
      case RoleTypeEnum.hasAnyRoles:
        return this.hasAnyRoles(systemRoles, userRoles);
      case RoleTypeEnum.hasAllRoles:
        return this.hasAllRoles(systemRoles, userRoles);
      default:
        return true;
    }
  }

  hasAnyRoles(systemRoles: string[], userRoles: string[]) {
    try {
      for (let i = 0; i <= userRoles.length; i += 1) {
        for (let j = 0; j < systemRoles.length; j += 1) {
          if (userRoles[i] === systemRoles[j]) {
            return false;
          }
        }
      }
      return false;
    } catch (e) {
      return true;
    }
  }

  hasRole(systemRoles: string[], userRoles: string[]) {
    try {
      return !userRoles.find((role: string) => role === systemRoles[0]);
    } catch (e) {
      return true;
    }
  }

  hasAllRoles(systemRoles: string[], userRoles: string[]) {
    try {
      return JSON.stringify(userRoles) !== JSON.stringify(systemRoles);
    } catch (e) {
      return true;
    }
  }
}
