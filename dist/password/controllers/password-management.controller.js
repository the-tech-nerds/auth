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
exports.PasswordManagementController = void 0;
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const forget_password_init_request_1 = require("../requests/forget-password-init.request");
const forget_password_init_service_1 = require("../services/forget-password-init.service");
const forget_password_complete_request_1 = require("../requests/forget-password-complete.request");
const reset_password_request_1 = require("../requests/reset-password.request");
const forget_password_complete_service_1 = require("../services/forget-password-complete.service");
const reset_password_service_1 = require("../services/reset-password.service");
const create_password_request_1 = require("../requests/create-password.request");
const create_password_servic_e_1 = require("../services/create-password.servic e");
const reset_password_auto_generate_service_1 = require("../services/reset-password-auto-generate.service");
const reset_password_auto_generate_request_1 = require("../requests/reset-password-auto-generate.request");
let PasswordManagementController = class PasswordManagementController {
    constructor(forgetPasswordInitService, forgetPasswordCompleteService, resetPasswordService, createPasswordService, apiResponseService, resetPasswordAutoGenerateService) {
        this.forgetPasswordInitService = forgetPasswordInitService;
        this.forgetPasswordCompleteService = forgetPasswordCompleteService;
        this.resetPasswordService = resetPasswordService;
        this.createPasswordService = createPasswordService;
        this.apiResponseService = apiResponseService;
        this.resetPasswordAutoGenerateService = resetPasswordAutoGenerateService;
    }
    async recoverForgetPassInit(request, res) {
        const data = await this.forgetPasswordInitService.execute(request, res);
        return this.apiResponseService.successResponse([data.info], null, res);
    }
    async recoverForgetPassComplete(userType, request, res) {
        const data = await this.forgetPasswordCompleteService.execute(request, Number(userType));
        return this.apiResponseService.successResponse(['Password has been updated successfully'], data, res);
    }
    async resetPassword(userId, request, res) {
        const data = await this.resetPasswordService.execute(request, userId);
        return this.apiResponseService.successResponse(['Password has been reset successfully'], data, res);
    }
    async resetAdminPassword(request, userId, res) {
        const data = await this.resetPasswordAutoGenerateService.execute(request.user_id);
        return this.apiResponseService.successResponse(['Password has been reset successfully'], data, res);
    }
    async createPassword(userId, request, res) {
        request.user_id = userId;
        const data = await this.createPasswordService.execute(request);
        return this.apiResponseService.successResponse(['Password has been created successfully'], data, res);
    }
};
__decorate([
    common_1.Post('/recover/init'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_password_init_request_1.ForgetPasswordInitRequest, Object]),
    __metadata("design:returntype", Promise)
], PasswordManagementController.prototype, "recoverForgetPassInit", null);
__decorate([
    common_1.Post('/recover/complete'),
    __param(0, common_1.Query('userType')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, forget_password_complete_request_1.ForgetPasswordCompleteRequest, Object]),
    __metadata("design:returntype", Promise)
], PasswordManagementController.prototype, "recoverForgetPassComplete", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Post('/reset'),
    __param(0, common_services_1.CurrentUser('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reset_password_request_1.ResetPasswordRequest, Object]),
    __metadata("design:returntype", Promise)
], PasswordManagementController.prototype, "resetPassword", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Post('/reset-password-auto-generate'),
    __param(0, common_1.Body()),
    __param(1, common_services_1.CurrentUser('id')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_auto_generate_request_1.ResetPasswordAutoGenerateRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], PasswordManagementController.prototype, "resetAdminPassword", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Post('/create'),
    __param(0, common_services_1.CurrentUser('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_password_request_1.CreatePasswordRequest, Object]),
    __metadata("design:returntype", Promise)
], PasswordManagementController.prototype, "createPassword", null);
PasswordManagementController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [forget_password_init_service_1.ForgetPasswordInitService,
        forget_password_complete_service_1.ForgetPasswordCompleteService,
        reset_password_service_1.ResetPasswordService,
        create_password_servic_e_1.CreatePasswordService,
        common_services_1.ApiResponseService,
        reset_password_auto_generate_service_1.ResetPasswordAutoGenerateService])
], PasswordManagementController);
exports.PasswordManagementController = PasswordManagementController;
//# sourceMappingURL=password-management.controller.js.map