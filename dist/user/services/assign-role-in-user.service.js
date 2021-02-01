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
exports.AssignRolesInUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_services_1 = require("@the-tech-nerds/common-services");
const authorization_service_1 = require("../../authorization/services/authorization.service");
const role_entity_1 = require("../../authorization/entities/role.entity");
const user_entity_1 = require("../entities/user.entity");
let AssignRolesInUserService = class AssignRolesInUserService extends authorization_service_1.AuthorizationService {
    constructor(rolesRepository, userRepository, cacheService) {
        super();
        this.rolesRepository = rolesRepository;
        this.userRepository = userRepository;
        this.cacheService = cacheService;
    }
    async assign(user_id, roles) {
        try {
            const USER = await this.userRepository.findOne(user_id);
            USER === null || USER === void 0 ? void 0 : USER.roles = (await this.rolesRepository.findByIds(roles)) || [];
            const user = await this.userRepository.save(USER);
            await this.cacheService.delete(`user-token-${user_id}`);
            return { user };
        }
        catch (e) {
            return null;
        }
    }
};
AssignRolesInUserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(role_entity_1.Roles)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        common_services_1.CacheService])
], AssignRolesInUserService);
exports.AssignRolesInUserService = AssignRolesInUserService;
//# sourceMappingURL=assign-role-in-user.service.js.map