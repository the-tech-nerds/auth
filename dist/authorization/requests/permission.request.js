"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRequest = void 0;
const class_validator_1 = require("class-validator");
const permission_category_exist_validator_1 = require("../validators/permission-category-exist.validator");
class PermissionRequest {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Permission Name is required.' }),
    __metadata("design:type", String)
], PermissionRequest.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Permission category id is required.' }),
    class_validator_1.IsNumber(),
    permission_category_exist_validator_1.IsPermissionCategoryExist(false, {
        message: 'Permission category does not exist',
    }),
    __metadata("design:type", Number)
], PermissionRequest.prototype, "permission_category_id", void 0);
__decorate([
    class_validator_1.IsBoolean({ message: 'Is active should be boolean' }),
    __metadata("design:type", Boolean)
], PermissionRequest.prototype, "is_active", void 0);
exports.PermissionRequest = PermissionRequest;
//# sourceMappingURL=permission.request.js.map