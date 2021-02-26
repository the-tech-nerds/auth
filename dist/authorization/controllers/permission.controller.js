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
exports.PermissionController = void 0;
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const create_permission_service_1 = require("../services/permission/create-permission.service");
const delete_permission_service_1 = require("../services/permission/delete-permission.service");
const list_permission_service_1 = require("../services/permission/list-permission.service");
const update_permission_service_1 = require("../services/permission/update-permission.service");
const getById_permission_service_1 = require("../services/permission/getById-permission.service");
const permission_request_1 = require("../requests/permission.request");
let PermissionController = class PermissionController {
    constructor(createPermissionService, listPermissionService, getByIdPermissionService, deletePermissionService, updatePermissionService, apiResponseService) {
        this.createPermissionService = createPermissionService;
        this.listPermissionService = listPermissionService;
        this.getByIdPermissionService = getByIdPermissionService;
        this.deletePermissionService = deletePermissionService;
        this.updatePermissionService = updatePermissionService;
        this.apiResponseService = apiResponseService;
    }
    async createPermission(permissionRequest, res) {
        const data = await this.createPermissionService.create(permissionRequest);
        return this.apiResponseService.successResponse(['Permission category store successfully'], data, res);
    }
    async getAllPermissions(res) {
        const data = await this.listPermissionService.getAll();
        return this.apiResponseService.successResponse(['List of permission'], data, res);
    }
    async getPermissionsFromRole(roleId, res) {
        const data = await this.listPermissionService.getFromRole(roleId);
        const permission = data === null || data === void 0 ? void 0 : data.permissions.map((p) => p.id);
        return this.apiResponseService.successResponse(['Role Permission retrieved successfully'], {
            permissions: permission,
            role: {
                name: data.name,
                id: roleId,
            },
        }, res);
    }
    async getPermissionsById(id, res) {
        const data = await this.getByIdPermissionService.getById(id);
        return this.apiResponseService.successResponse(['Get permission successfully'], data, res);
    }
    async updatePermission(id, permissionRequest, res) {
        const data = await this.updatePermissionService.update(id, permissionRequest);
        return this.apiResponseService.successResponse(['Permission category updated successfully'], data, res);
    }
    async DeletePermissions(id, res) {
        const data = await this.deletePermissionService.delete(id);
        return this.apiResponseService.successResponse(['Permission category deleted successfully'], data, res);
    }
};
__decorate([
    common_1.Post('/permission'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permission_request_1.PermissionRequest, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "createPermission", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.PERMISSION.GET], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Get('/permissions'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getAllPermissions", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.PERMISSION.GET], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Get('/role/:roleId/permissions'),
    __param(0, common_1.Param('roleId')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getPermissionsFromRole", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.PERMISSION.GET], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Get('/permission/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getPermissionsById", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.PERMISSION.UPDATE], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Put('/permission/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, permission_request_1.PermissionRequest, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "updatePermission", null);
__decorate([
    common_1.Delete('/permission/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "DeletePermissions", null);
PermissionController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [create_permission_service_1.CreatePermissionService,
        list_permission_service_1.ListPermissionService,
        getById_permission_service_1.GetByIdPermissionService,
        delete_permission_service_1.DeletePermissionService,
        update_permission_service_1.UpdatePermissionService,
        common_services_1.ApiResponseService])
], PermissionController);
exports.PermissionController = PermissionController;
//# sourceMappingURL=permission.controller.js.map