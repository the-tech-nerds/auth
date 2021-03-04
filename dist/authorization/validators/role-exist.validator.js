"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsRoleNotExist = exports.IsRoleNotExistConstraint = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const role_repository_1 = require("../repositories/role.repository");
let IsRoleNotExistConstraint = class IsRoleNotExistConstraint {
    validate(role_id, args) {
        const roleCategoryRepository = typeorm_1.getCustomRepository(role_repository_1.RoleRepository);
        return roleCategoryRepository.findOne(role_id).then((role) => !!role);
    }
};
IsRoleNotExistConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: true })
], IsRoleNotExistConstraint);
exports.IsRoleNotExistConstraint = IsRoleNotExistConstraint;
function IsRoleNotExist(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsRoleNotExistConstraint,
        });
    };
}
exports.IsRoleNotExist = IsRoleNotExist;
//# sourceMappingURL=role-exist.validator.js.map