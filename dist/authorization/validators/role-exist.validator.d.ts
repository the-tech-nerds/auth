import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsRoleNotExistConstraint implements ValidatorConstraintInterface {
    validate(role_id: number, args: ValidationArguments): Promise<boolean>;
}
export declare function IsRoleNotExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
