"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPermissionNotExist = exports.IsPermissionNotExistConstraint = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const permission_repository_1 = require("../repositories/permission.repository");
let IsPermissionNotExistConstraint = class IsPermissionNotExistConstraint {
    validate(permission_category_id, args) {
        const permissionRepository = typeorm_1.getCustomRepository(permission_repository_1.PermissionRepository);
        return permissionRepository
            .findOne(permission_category_id)
            .then(permission => !!permission);
    }
};
IsPermissionNotExistConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: true })
], IsPermissionNotExistConstraint);
exports.IsPermissionNotExistConstraint = IsPermissionNotExistConstraint;
function IsPermissionNotExist(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPermissionNotExistConstraint,
        });
    };
}
exports.IsPermissionNotExist = IsPermissionNotExist;
//# sourceMappingURL=permission-exist.validator.js.map