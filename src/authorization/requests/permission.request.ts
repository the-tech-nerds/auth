import {
  IsNotEmpty, IsBoolean, IsNumber,
} from 'class-validator';

export class PermissionRequest {
  @IsNotEmpty({ message: 'Permission Name is required.' })
  name: string;

  description: string;

  @IsNotEmpty({ message: 'Permission category id is required.' })
  @IsNumber()
  permission_category_id: number;

  @IsBoolean({ message: 'Is active should be boolean' })
  is_active: boolean;
}
