import { IsArray } from 'class-validator';

export class UserAssignRolesRequest {
  @IsArray({ message: 'Role Should be array!' })
  roles: number[];
}
