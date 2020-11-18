import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { IsPermissionCategoryExist } from '../validators/permission-category-exist.validator';

export class PermissionRequest {
  @IsNotEmpty({ message: 'Permission Name is required.' })
  name: string;

  description: string;

  @IsNotEmpty({ message: 'Permission category id is required.' })
  @IsNumber()
  @IsPermissionCategoryExist(false, {
    message: 'Permission category does not exist',
  })
  permission_category_id: number;

  @IsBoolean({ message: 'Is active should be boolean' })
  is_active: boolean;
}
