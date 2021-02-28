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
exports.PermissionCategories = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../utils/entities/base-entity");
const permission_entity_1 = require("./permission.entity");
let PermissionCategories = class PermissionCategories extends base_entity_1.default {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PermissionCategories.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PermissionCategories.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], PermissionCategories.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], PermissionCategories.prototype, "is_active", void 0);
__decorate([
    typeorm_1.OneToMany(() => permission_entity_1.Permissions, permission => permission.permission_category, { cascade: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], PermissionCategories.prototype, "permissions", void 0);
PermissionCategories = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['name'])
], PermissionCategories);
exports.PermissionCategories = PermissionCategories;
//# sourceMappingURL=permission-category.entity.js.map