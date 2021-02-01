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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const create_role_service_1 = require("../services/role/create-role.service");
const list_role_service_1 = require("../services/role/list-role.service");
const get_by_id_role_service_1 = require("../services/role/get-by-id-role.service");
const delete_role_service_1 = require("../services/role/delete-role.service");
const update_role_service_1 = require("../services/role/update-role.service");
const role_request_1 = require("../requests/role.request");
const assign_permission_in_role_service_1 = require("../services/role/assign-permission-in-role.service");
const role_assign_permission_request_1 = require("../requests/role-assign-permission.request");
let RoleController = class RoleController {
    constructor(createRoleService, listRoleService, getByIdRoleService, deleteRoleService, assignPermissionInRoleService, updateRoleService, apiResponseService) {
        this.createRoleService = createRoleService;
        this.listRoleService = listRoleService;
        this.getByIdRoleService = getByIdRoleService;
        this.deleteRoleService = deleteRoleService;
        this.assignPermissionInRoleService = assignPermissionInRoleService;
        this.updateRoleService = updateRoleService;
        this.apiResponseService = apiResponseService;
    }
    async createRole(roleRequest, res) {
        const data = await this.createRoleService.create(roleRequest);
        return this.apiResponseService.successResponse(['Role category store successfully'], data, res);
    }
    async getAllRoles(res) {
        const data = await this.listRoleService.getAll();
        return this.apiResponseService.successResponse(['List of role'], data, res);
    }
    async getRolesById(id, res) {
        const data = await this.getByIdRoleService.getById(id);
        return this.apiResponseService.successResponse(['Get role successfully'], data, res);
    }
    async updateRole(id, roleRequest, res) {
        const data = await this.updateRoleService.update(id, roleRequest);
        return this.apiResponseService.successResponse(['Role category updated successfully'], data, res);
    }
    async changeRoleStatus(id, res) {
        const data = await this.updateRoleService.changeStatus(id);
        return this.apiResponseService.successResponse(['Role category updated successfully'], data, res);
    }
    async DeleteRoles(id, res) {
        const data = await this.deleteRoleService.delete(id);
        return this.apiResponseService.successResponse(['Role category deleted successfully'], data, res);
    }
    async AssignPermission(id, roleAssignPermissionRequest, res) {
        const data = await this.assignPermissionInRoleService.assign(id, roleAssignPermissionRequest.permissions);
        return this.apiResponseService.successResponse(['Role Assign successfully'], data, res);
    }
};
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.ROLE.CREATE], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Post('/role'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_request_1.RoleRequest, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRole", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.ROLE.GET], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Get('/roles'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getAllRoles", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.ROLE.DETAILS], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Get('/role/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRolesById", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.ROLE.UPDATE], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Put('/role/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, role_request_1.RoleRequest, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateRole", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.ROLE.UPDATE], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Put('/role/:id/status'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "changeRoleStatus", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.ROLE.DELETE], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Delete('/role/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "DeleteRoles", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.ROLE.PERMISSION_ASSIGN], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Post('/role/:id/assign-permissions'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, role_assign_permission_request_1.RoleAssignPermissionRequest, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "AssignPermission", null);
RoleController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [create_role_service_1.CreateRoleService,
        list_role_service_1.ListRoleService,
        get_by_id_role_service_1.GetByIdRoleService,
        delete_role_service_1.DeleteRoleService,
        assign_permission_in_role_service_1.AssignPermissionInRoleService,
        update_role_service_1.UpdateRoleService,
        common_services_1.ApiResponseService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map