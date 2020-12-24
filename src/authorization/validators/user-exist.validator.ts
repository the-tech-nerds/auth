/* eslint-disable func-names */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';

@ValidatorConstraint({ async: true })
export class IsUserExistConstraint implements ValidatorConstraintInterface {
  validate(user_id: number, args: ValidationArguments) {
    const userRepository = getCustomRepository(UserRepository);
    return userRepository.findOne(user_id).then(user => !!user);
  }
}

export function IsUserExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line func-names
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistConstraint,
    });
  };
}
