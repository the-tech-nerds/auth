import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getCustomRepository } from 'typeorm';
import { PermissionCategoryRepository } from '../repositories/permission-category.repository';

@ValidatorConstraint({ async: true })
export class IsPermissionCategoryExistConstraint
  implements ValidatorConstraintInterface {
  validate(permission_category_id: number, args: ValidationArguments) {
    const permissionCategoryRepository = getCustomRepository(
      PermissionCategoryRepository,
    );
    return permissionCategoryRepository
      .findOne(permission_category_id)
      .then(permissionCategories =>
        args.constraints[0] ? !permissionCategories : !!permissionCategories,
      );
  }
}

export function IsPermissionCategoryExist(
  exist: boolean = false,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [exist],
      validator: IsPermissionCategoryExistConstraint,
    });
  };
}
