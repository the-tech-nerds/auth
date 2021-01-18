import { IsNotEmpty } from 'class-validator';

export class RoleRequest {
  @IsNotEmpty({ message: 'Role name is required.' })
  name: string;

  id?: number;

  permissions: [];
}
