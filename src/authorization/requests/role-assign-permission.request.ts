import { IsArray, IsNotEmpty } from 'class-validator';

export class RoleAssignPermissionRequest {
  @IsNotEmpty({ message: 'Permissions should not empty!' })
  @IsArray({ message: 'Permissions should be array!' })
  permissions: number[];
}
