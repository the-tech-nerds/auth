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
exports.PermissionCategoryController = void 0;
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const create_permision_category_service_1 = require("../services/permission-category/create-permision-category.service");
const list_permission_category_service_1 = require("../services/permission-category/list-permission-category.service");
const update_permission_category_service_1 = require("../services/permission-category/update-permission-category.service");
const delete_permission_category_service_1 = require("../services/permission-category/delete-permission-category.service");
const permission_category_request_1 = require("../requests/permission-category.request");
let PermissionCategoryController = class PermissionCategoryController {
    constructor(createPermissionCategoryService, listPermissionCategoryService, updatePermissionCategoryService, deletePermissionCategoryService, apiResponseService) {
        this.createPermissionCategoryService = createPermissionCategoryService;
        this.listPermissionCategoryService = listPermissionCategoryService;
        this.updatePermissionCategoryService = updatePermissionCategoryService;
        this.deletePermissionCategoryService = deletePermissionCategoryService;
        this.apiResponseService = apiResponseService;
    }
    async createPermissionCategory(permissionCategoryRequest, res) {
        const data = await this.createPermissionCategoryService.create(permissionCategoryRequest);
        return this.apiResponseService.successResponse(['Permission category store successfully'], data, res);
    }
    async getAllPermissionsCategory(res) {
        const data = await this.listPermissionCategoryService.getAll();
        return this.apiResponseService.successResponse(['Permission retrieved successfully'], data, res);
    }
    async getPermissionsCategoryFromRole(roleId, res) {
        const data = await this.listPermissionCategoryService.getFromRole(roleId);
        return this.apiResponseService.successResponse(['Permission retrieved successfully'], data, res);
    }
    async updatePermissionCategory(id, permissionCategoryRequest, res) {
        const data = await this.updatePermissionCategoryService.update(id, permissionCategoryRequest);
        return this.apiResponseService.successResponse(['Permission update successfully'], data, res);
    }
    async deletePermissionCategory(id, res) {
        await this.deletePermissionCategoryService.delete(id);
        return this.apiResponseService.successResponse(['Permission delete successfully'], null, res);
    }
};
__decorate([
    common_1.Post('/category'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permission_category_request_1.PermissionCategoryRequest, Object]),
    __metadata("design:returntype", Promise)
], PermissionCategoryController.prototype, "createPermissionCategory", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.PERMISSION_CATEGORY.GET], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Get('/categories'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionCategoryController.prototype, "getAllPermissionsCategory", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.PERMISSION_CATEGORY.GET], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Get('/categories/role/:roleId'),
    __param(0, common_1.Param('roleId')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PermissionCategoryController.prototype, "getPermissionsCategoryFromRole", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.PERMISSION_CATEGORY.UPDATE], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Put('/category/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, permission_category_request_1.PermissionCategoryRequest, Object]),
    __metadata("design:returntype", Promise)
], PermissionCategoryController.prototype, "updatePermissionCategory", null);
__decorate([
    common_1.Delete('/category/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PermissionCategoryController.prototype, "deletePermissionCategory", null);
PermissionCategoryController = __decorate([
    common_1.Controller('permission'),
    __metadata("design:paramtypes", [create_permision_category_service_1.CreatePermissionCategoryService,
        list_permission_category_service_1.ListPermissionCategoryService,
        update_permission_category_service_1.UpdatePermissionCategoryService,
        delete_permission_category_service_1.DeletePermissionCategoryService,
        common_services_1.ApiResponseService])
], PermissionCategoryController);
exports.PermissionCategoryController = PermissionCategoryController;
//# sourceMappingURL=permission-category.controller.js.map