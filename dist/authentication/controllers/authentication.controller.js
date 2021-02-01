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
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const user_registration_service_1 = require("../services/user.registration.service");
const user_registration_request_1 = require("../requests/user.registration.request");
const user_login_service_1 = require("../services/user.login.service");
const local_guard_1 = require("../guards/local.guard");
const user_logout_service_1 = require("../services/user.logout.service");
const user_entity_1 = require("../../user/entities/user.entity");
let AuthenticationController = class AuthenticationController {
    constructor(userRegistrationService, userLoginService, apiResponseService, userLogoutService) {
        this.userRegistrationService = userRegistrationService;
        this.userLoginService = userLoginService;
        this.apiResponseService = apiResponseService;
        this.userLogoutService = userLogoutService;
    }
    async loginAdmin(req) {
        return this.userLoginService.login(req.user, user_entity_1.UserType.ADMIN);
    }
    async loginUser(req) {
        return this.userLoginService.login(req.user, user_entity_1.UserType.USER);
    }
    async loginWithGmail(user) {
        return this.userLoginService.loginByGoogle(user);
    }
    async loginWithFacebook(user) {
        return this.userLoginService.loginByFacebook(user);
    }
    async registerAdmin(userRegistrationRequest, res) {
        const user = await this.userRegistrationService.register({
            ...userRegistrationRequest,
            type: 1,
        });
        return this.apiResponseService.successResponse(['Registered successfully'], user, res);
    }
    async registerUser(userRegistrationRequest, res) {
        const user = await this.userRegistrationService.register(userRegistrationRequest);
        return this.apiResponseService.successResponse(['Registered successfully'], user, res);
    }
    async logout(userId) {
        await this.userLogoutService.logout(userId);
    }
    test(req, res) {
        return this.apiResponseService.successResponse(['Test user data'], req.user, res);
    }
};
__decorate([
    common_1.UseGuards(local_guard_1.LocalGuard),
    common_1.Post('/login/admin'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "loginAdmin", null);
__decorate([
    common_1.UseGuards(local_guard_1.LocalGuard),
    common_1.Post('/login/user'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "loginUser", null);
__decorate([
    common_1.Post('/login/gmail'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "loginWithGmail", null);
__decorate([
    common_1.Post('/login/facebook'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "loginWithFacebook", null);
__decorate([
    common_services_1.HasPermissions([common_services_1.PermissionTypes.USER.CREATE], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Post('/register/admin'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_registration_request_1.UserRegistrationRequest, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "registerAdmin", null);
__decorate([
    common_1.Post('/register/user'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_registration_request_1.UserRegistrationRequest, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "registerUser", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Get('/logout'),
    __param(0, common_services_1.CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logout", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_services_1.HasPermissions([common_services_1.PermissionTypes.USER.GET], common_services_1.PermissionTypeEnum.hasPermission),
    common_1.Get('/test'),
    __param(0, common_1.Request()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AuthenticationController.prototype, "test", null);
AuthenticationController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [user_registration_service_1.UserRegistrationService,
        user_login_service_1.UserLoginService,
        common_services_1.ApiResponseService,
        user_logout_service_1.UserLogoutService])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map