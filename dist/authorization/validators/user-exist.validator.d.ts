import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsUserExistConstraint implements ValidatorConstraintInterface {
    validate(user_id: number, args: ValidationArguments): Promise<boolean>;
}
export declare function IsUserExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
