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
exports.AssignPermissionInRoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const authorization_service_1 = require("../authorization.service");
const role_entity_1 = require("../../entities/role.entity");
const permission_entity_1 = require("../../entities/permission.entity");
let AssignPermissionInRoleService = class AssignPermissionInRoleService extends authorization_service_1.AuthorizationService {
    constructor(rolesRepository, permissionsRepository) {
        super();
        this.rolesRepository = rolesRepository;
        this.permissionsRepository = permissionsRepository;
    }
    async assign(role_id, permissions) {
        try {
            const ROLE = await this.rolesRepository.findOne(role_id);
            ROLE === null || ROLE === void 0 ? void 0 : ROLE.permissions =
                (await this.permissionsRepository.findByIds(permissions)) || [];
            return { role: await this.rolesRepository.save(ROLE) };
        }
        catch (e) {
            return null;
        }
    }
};
AssignPermissionInRoleService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(role_entity_1.Roles)),
    __param(1, typeorm_1.InjectRepository(permission_entity_1.Permissions)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AssignPermissionInRoleService);
exports.AssignPermissionInRoleService = AssignPermissionInRoleService;
//# sourceMappingURL=assign-permission-in-role.service.js.map