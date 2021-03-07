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
exports.UpdateRoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_services_1 = require("@the-tech-nerds/common-services");
const role_entity_1 = require("../../entities/role.entity");
const permission_entity_1 = require("../../entities/permission.entity");
let UpdateRoleService = class UpdateRoleService {
    constructor(roleRepository, permissionRepository, cacheService) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.cacheService = cacheService;
    }
    async update(id, roleRequest) {
        const role = await this.roleRepository.findOneOrFail(id, {
            relations: ['users'],
        });
        role.name = roleRequest.name;
        role.updated_by = 1;
        role.permissions = await this.permissionRepository.findByIds(roleRequest.permissions);
        const res = this.roleRepository.save(role);
        this.removeTokenFromRedis(role === null || role === void 0 ? void 0 : role.users);
        return res;
    }
    async changeStatus(id) {
        const role = await this.roleRepository.findOneOrFail(id, {
            relations: ['users'],
        });
        role.is_active = !role.is_active;
        const res = await this.roleRepository.save(role);
        this.removeTokenFromRedis(role.users);
        return res;
    }
    removeTokenFromRedis(users) {
        if (!users || !users.length)
            return;
        users.map(({ id = null }) => this.cacheService.delete(`user-token-${id}`));
    }
};
UpdateRoleService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(role_entity_1.Roles)),
    __param(1, typeorm_1.InjectRepository(permission_entity_1.Permissions)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        common_services_1.CacheService])
], UpdateRoleService);
exports.UpdateRoleService = UpdateRoleService;
//# sourceMappingURL=update-role.service.js.map