import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsPermissionCategoryExistConstraint implements ValidatorConstraintInterface {
    validate(permission_category_id: number, args: ValidationArguments): Promise<boolean>;
}
export declare function IsPermissionCategoryExist(exist?: boolean, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
