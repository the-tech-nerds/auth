/* eslint-disable func-names */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getCustomRepository } from 'typeorm';
import { RoleRepository } from '../repositories/role.repository';

@ValidatorConstraint({ async: true })
export class IsRoleNotExistConstraint implements ValidatorConstraintInterface {
  validate(role_id: number, args: ValidationArguments) {
    const roleCategoryRepository = getCustomRepository(RoleRepository);
    return roleCategoryRepository.findOne(role_id).then(role => !!role);
  }
}

export function IsRoleNotExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line func-names
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRoleNotExistConstraint,
    });
  };
}
