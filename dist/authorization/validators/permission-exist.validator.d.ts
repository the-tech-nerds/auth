import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsPermissionNotExistConstraint implements ValidatorConstraintInterface {
    validate(permission_category_id: number, args: ValidationArguments): Promise<boolean>;
}
export declare function IsPermissionNotExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
