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
exports.GetByIdRoleService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../../entities/role.entity");
const permission_category_entity_1 = require("../../entities/permission-category.entity");
let GetByIdRoleService = class GetByIdRoleService {
    constructor(roleRepository, permissionCategoriesRepository) {
        this.roleRepository = roleRepository;
        this.permissionCategoriesRepository = permissionCategoriesRepository;
    }
    async getById(id) {
        return this.roleRepository.findOne(id, {
            relations: ['permissions', 'permissions.permission_category'],
        });
    }
    async getRoleDetailsById(id) {
        const role = await this.roleRepository.findOne(id, {
            relations: ['permissions'],
            where: {
                is_active: true,
            },
        });
        let permissionCategory = await this.permissionCategoriesRepository.find({
            where: {
                is_active: true,
            },
        });
        permissionCategory = permissionCategory
            .map((pc) => {
            pc.permissions = pc.permissions.filter((permission) => (role === null || role === void 0 ? void 0 : role.permissions.filter((p) => permission.id === p.id)) || []);
            return pc;
        })
            .filter((pc) => pc.permissions.length > 0);
        return {
            role: {
                name: role.name,
                id: role.id,
                permission_category: permissionCategory,
            },
        };
    }
};
GetByIdRoleService = __decorate([
    __param(0, typeorm_1.InjectRepository(role_entity_1.Roles)),
    __param(1, typeorm_1.InjectRepository(permission_category_entity_1.PermissionCategories)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GetByIdRoleService);
exports.GetByIdRoleService = GetByIdRoleService;
//# sourceMappingURL=get-by-id-role.service.js.map