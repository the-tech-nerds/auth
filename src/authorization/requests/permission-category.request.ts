import { IsNotEmpty, IsBoolean } from 'class-validator';

export class PermissionCategoryRequest {
  @IsNotEmpty({ message: 'Permission Name is required.' })
  name: string;

  description: string;

  @IsBoolean({ message: 'Is active should be boolean' })
  is_active?: boolean;
}
