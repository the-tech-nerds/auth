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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const platform_express_1 = require("@nestjs/platform-express");
const user_update_request_1 = require("../requests/user-update.request");
const list_users_service_1 = require("../services/list-users.service");
const update_user_service_1 = require("../services/update-user.service");
const fetch_user_by_id_service_1 = require("../services/fetch-user-by-id.service");
const delete_user_service_1 = require("../services/delete-user.service");
const get_addresses_by_user_service_1 = require("../services/get-addresses-by-user.service");
const user_assign_permission_request_1 = require("../requests/user-assign-permission.request");
const assign_role_in_user_service_1 = require("../services/assign-role-in-user.service");
const fetch_user_info_by_id_servec_1 = require("../services/fetch-user-info-by-id.servec");
const user_info_update_request_1 = require("../requests/user-info-update.request");
const update_user_info_service_1 = require("../services/update-user-info.service");
const verified_phone_service_1 = require("../services/verified-phone.service");
const update_phone_request_1 = require("../requests/update-phone.request");
const update_phone_service_1 = require("../services/update-phone.service");
const update_email_service_1 = require("../services/update-email.service");
const update_email_request_1 = require("../requests/update-email.request");
const fetch_user_by_email_service_1 = require("../services/fetch-user-by-email.service");
const fetch_user_by_phone_service_1 = require("../services/fetch-user-by-phone.service");
const update_user_freeze_status_service_1 = require("../services/update-user-freeze-status.service");
const user_mock_create_service_1 = require("../services/user-mock-create.service");
let UserController = class UserController {
    constructor(listUsersService, updateUsersService, fetchUserByIdService, getAddressesByUserService, assignRolesInUserService, deleteUserService, apiResponseService, fetchUserInfoByIdService, updateUserInfoService, updatePhoneVerifiedService, updatePhoneService, uploadService, updateEmailService, fetchUserInfoByEmailService, fetchUserInfoByPhoneService, updateUserFreezeStatusService, userMockCreateService) {
        this.listUsersService = listUsersService;
        this.updateUsersService = updateUsersService;
        this.fetchUserByIdService = fetchUserByIdService;
        this.getAddressesByUserService = getAddressesByUserService;
        this.assignRolesInUserService = assignRolesInUserService;
        this.deleteUserService = deleteUserService;
        this.apiResponseService = apiResponseService;
        this.fetchUserInfoByIdService = fetchUserInfoByIdService;
        this.updateUserInfoService = updateUserInfoService;
        this.updatePhoneVerifiedService = updatePhoneVerifiedService;
        this.updatePhoneService = updatePhoneService;
        this.uploadService = uploadService;
        this.updateEmailService = updateEmailService;
        this.fetchUserInfoByEmailService = fetchUserInfoByEmailService;
        this.fetchUserInfoByPhoneService = fetchUserInfoByPhoneService;
        this.updateUserFreezeStatusService = updateUserFreezeStatusService;
        this.userMockCreateService = userMockCreateService;
    }
    async getUsers(query, userType, res) {
        const data = await this.listUsersService.execute(userType, query);
        return this.apiResponseService.successResponse(['User list fetched successfully'], data, res);
    }
    async createMockUsers(res) {
        await this.userMockCreateService.execute(10000);
        return this.apiResponseService.successResponse(['User list fetched successfully'], 'User created successfully', res);
    }
    async updateUser(id, userUpdateRequest, res) {
        const data = await this.updateUsersService.execute(id, userUpdateRequest);
        return this.apiResponseService.successResponse(['User has been updated successfully'], data, res);
    }
    async unfreezeUser(id, res) {
        const data = await this.updateUserFreezeStatusService.unfreezeUser(id);
        return this.apiResponseService.successResponse(['User has been unfrozen successfully'], data, res);
    }
    async getUserById(id, res) {
        const data = await this.fetchUserByIdService.execute(id);
        return this.apiResponseService.successResponse(['User fetched successfully'], data, res);
    }
    async getUserInfoById(userId, res) {
        const data = await this.fetchUserInfoByIdService.execute(userId);
        return this.apiResponseService.successResponse(['User fetched successfully'], data, res);
    }
    async updateUserInfo(userId, userInfoUpdateRequest, res) {
        const data = await this.updateUserInfoService.execute(userId, userInfoUpdateRequest);
        return this.apiResponseService.successResponse(['User has been updated successfully'], data, res);
    }
    async VerifyPhoneNumber(userId, res) {
        const data = await this.updatePhoneVerifiedService.execute(userId);
        return this.apiResponseService.successResponse(['Mobile verified successfully'], data, res);
    }
    async UpdatePhoneNumber(userId, request, res) {
        request.user_id = userId;
        const data = await this.updatePhoneService.execute(request);
        return this.apiResponseService.successResponse(['Mobile updated successfully'], data, res);
    }
    async UpdateEmail(userId, updateEmailRequest, res) {
        const data = await this.updateEmailService.execute(updateEmailRequest, userId);
        return this.apiResponseService.successResponse(['Email updated successfully'], data, res);
    }
    async getAddressByUser(id, res) {
        const data = await this.getAddressesByUserService.execute(id);
        return this.apiResponseService.successResponse(['User Addresses fetched successfully'], data, res);
    }
    async DeleteUser(id, res) {
        const data = await this.deleteUserService.execute(id);
        return this.apiResponseService.successResponse(['User has been deleted successfully'], data, res);
    }
    async AssignPermission(id, userAssignRolesRequest, res) {
        const data = await this.assignRolesInUserService.assign(id, userAssignRolesRequest.roles);
        return this.apiResponseService.successResponse(['Role Assign successfully'], data, res);
    }
    async upload(file, content, res) {
        const model = JSON.parse(content.fileStoreInfo);
        return this.uploadService
            .upload(file, undefined, model.folder, model.entity)
            .then((response) => this.apiResponseService.successResponse(['Image Uploaded successfully'], response, res))
            .catch((error) => this.apiResponseService.internalServerError(['Something went wrong! please try again later'], res));
    }
    async getUserByEmail(userType, email, res) {
        const data = await this.fetchUserInfoByEmailService.execute(email, Number(userType), true);
        return this.apiResponseService.successResponse(['User  fetched successfully'], data, res);
    }
    async getUserByPhone(userType, phone, res) {
        const data = await this.fetchUserInfoByPhoneService.execute(phone, Number(userType));
        return this.apiResponseService.successResponse(['User  fetched successfully'], data, res);
    }
};
__decorate([
    common_1.Get('/all'),
    __param(0, common_services_1.Paginate()),
    __param(1, common_1.Query('userType')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    common_1.Post('/register/mock'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createMockUsers", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_services_1.HasPermissions([common_services_1.PermissionTypes.USER.UPDATE], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Put('/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_update_request_1.UserUpdateRequest, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.USER.UPDATE], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Put('/:id/unfreeze'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unfreezeUser", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_services_1.HasPermissions([common_services_1.PermissionTypes.USER.DETAILS], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Get('/profile/info'),
    __param(0, common_services_1.CurrentUser('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfoById", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Put('/profile/info'),
    __param(0, common_services_1.CurrentUser('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_info_update_request_1.UserInfoUpdateRequest, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserInfo", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Put('/phone/verify'),
    __param(0, common_services_1.CurrentUser('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "VerifyPhoneNumber", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Put('/update/phone'),
    __param(0, common_services_1.CurrentUser('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_phone_request_1.UpdatePhoneRequest, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UpdatePhoneNumber", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Put('/update/email'),
    __param(0, common_services_1.CurrentUser('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_email_request_1.UpdateEmailRequest, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UpdateEmail", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Get('/:id/addresses'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAddressByUser", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_services_1.HasPermissions([common_services_1.PermissionTypes.USER.DELETE], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "DeleteUser", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_services_1.HasPermissions([common_services_1.PermissionTypes.USER.ROLE_ASSIGN], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Post('/:id/assign-roles'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_assign_permission_request_1.UserAssignRolesRequest, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "AssignPermission", null);
__decorate([
    common_1.Post('upload'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image')),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "upload", null);
__decorate([
    common_1.Get('/check/email'),
    __param(0, common_1.Query('userType')),
    __param(1, common_1.Query('email')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByEmail", null);
__decorate([
    common_1.Get('/check/phone'),
    __param(0, common_1.Query('userType')),
    __param(1, common_1.Query('phone')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByPhone", null);
UserController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [list_users_service_1.ListUsersService,
        update_user_service_1.UpdateUsersService,
        fetch_user_by_id_service_1.FetchUserByIdService,
        get_addresses_by_user_service_1.GetAddressesByUserService,
        assign_role_in_user_service_1.AssignRolesInUserService,
        delete_user_service_1.DeleteUserService,
        common_services_1.ApiResponseService,
        fetch_user_info_by_id_servec_1.FetchUserInfoByIdService,
        update_user_info_service_1.UpdateUserInfoesService,
        verified_phone_service_1.UpdatePhoneVerifiedService,
        update_phone_service_1.UpdatePhoneService,
        common_services_1.UploadService,
        update_email_service_1.UpdateEmailService,
        fetch_user_by_email_service_1.FetchUserInfoByEmailService,
        fetch_user_by_phone_service_1.FetchUserInfoByPhoneService,
        update_user_freeze_status_service_1.UpdateUserFreezeStatusService,
        user_mock_create_service_1.UserMockCreateService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map