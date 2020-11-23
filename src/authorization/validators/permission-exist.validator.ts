import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getCustomRepository } from 'typeorm';
import { PermissionRepository } from '../repositories/permission.repository';

@ValidatorConstraint({ async: true })
export class IsPermissionNotExistConstraint
implements ValidatorConstraintInterface {
  validate(permission_category_id: number, args: ValidationArguments) {
    const permissionRepository = getCustomRepository(PermissionRepository);
    return permissionRepository
      .findOne(permission_category_id)
      .then((permission) => !!permission);
  }
}

export function IsPermissionNotExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPermissionNotExistConstraint,
    });
  };
}
