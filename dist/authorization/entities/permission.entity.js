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
exports.Permissions = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../utils/entities/base-entity");
const permission_category_entity_1 = require("./permission-category.entity");
const role_entity_1 = require("./role.entity");
let Permissions = class Permissions extends base_entity_1.default {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Permissions.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], Permissions.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Permissions.prototype, "description", void 0);
__decorate([
    typeorm_1.JoinColumn(),
    typeorm_1.ManyToOne(() => permission_category_entity_1.PermissionCategories, (category) => category.permissions, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", permission_category_entity_1.PermissionCategories)
], Permissions.prototype, "permission_category", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Permissions.prototype, "is_active", void 0);
__decorate([
    typeorm_1.ManyToMany(() => role_entity_1.Roles, (roles) => roles.permissions, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Permissions.prototype, "roles", void 0);
Permissions = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['name'])
], Permissions);
exports.Permissions = Permissions;
//# sourceMappingURL=permission.entity.js.map