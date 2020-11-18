import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { IsPermissionCategoryNotExist } from '../validators/persmission-category-already-exist.validator';

export class PermissionRequest {
  @IsNotEmpty({ message: 'Permission Name is required.' })
  name: string;

  description: string;

  @IsNotEmpty({ message: 'Permission category id is required.' })
  @IsNumber()
  @IsPermissionCategoryNotExist({
    message: 'Permission category does not exist',
  })
  permission_category_id: number;

  @IsBoolean({ message: 'Is active should be boolean' })
  is_active: boolean;
}
