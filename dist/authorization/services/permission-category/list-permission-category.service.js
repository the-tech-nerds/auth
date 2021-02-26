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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPermissionCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permission_category_entity_1 = require("../../entities/permission-category.entity");
const typeorm_2 = require("typeorm");
const authorization_service_1 = require("../authorization.service");
const get_by_id_role_service_1 = require("../role/get-by-id-role.service");
let ListPermissionCategoryService = class ListPermissionCategoryService extends authorization_service_1.AuthorizationService {
    constructor(permissionCategoryRepository, getByIdRoleService) {
        super();
        this.permissionCategoryRepository = permissionCategoryRepository;
        this.getByIdRoleService = getByIdRoleService;
    }
    async getAll() {
        return this.permissionCategoryRepository.find({
            where: {
                is_active: true,
                deleted_at: null,
            },
            relations: ['permissions'],
        });
    }
    async getFromRole(roleId) {
        var _a;
        const role = await this.getByIdRoleService.getById(roleId);
        const permissioncategoryIds = {};
        const categoryList = {};
        (_a = role === null || role === void 0 ? void 0 : role.permissions) === null || _a === void 0 ? void 0 : _a.forEach((permission) => {
            if (permissioncategoryIds[permission.permission_category.name]) {
                categoryList[permission.permission_category.name].push({
                    permission_id: permission.id,
                    permission_name: permission.name,
                });
            }
            else {
                permissioncategoryIds[permission.permission_category.name] = true;
                categoryList[permission.permission_category.name] = [];
                categoryList[permission.permission_category.name].push({
                    permission_id: permission.id,
                    permission_name: permission.name,
                });
            }
        });
        return {
            role_name: role === null || role === void 0 ? void 0 : role.name,
            permission_category: categoryList,
        };
    }
};
ListPermissionCategoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(permission_category_entity_1.PermissionCategories)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        get_by_id_role_service_1.GetByIdRoleService])
], ListPermissionCategoryService);
exports.ListPermissionCategoryService = ListPermissionCategoryService;
//# sourceMappingURL=list-permission-category.service.js.map