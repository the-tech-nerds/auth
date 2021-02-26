"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPermissionCategoryExist = exports.IsPermissionCategoryExistConstraint = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const permission_category_repository_1 = require("../repositories/permission-category.repository");
let IsPermissionCategoryExistConstraint = class IsPermissionCategoryExistConstraint {
    validate(permission_category_id, args) {
        const permissionCategoryRepository = typeorm_1.getCustomRepository(permission_category_repository_1.PermissionCategoryRepository);
        return permissionCategoryRepository
            .findOne(permission_category_id)
            .then(pc => (args.constraints[0] ? !pc : !!pc));
    }
};
IsPermissionCategoryExistConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: true })
], IsPermissionCategoryExistConstraint);
exports.IsPermissionCategoryExistConstraint = IsPermissionCategoryExistConstraint;
function IsPermissionCategoryExist(exist = false, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [exist],
            validator: IsPermissionCategoryExistConstraint,
        });
    };
}
exports.IsPermissionCategoryExist = IsPermissionCategoryExist;
//# sourceMappingURL=permission-category-exist.validator.js.map