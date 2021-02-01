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
exports.UserLoginService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const common_services_1 = require("@the-tech-nerds/common-services");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const user_registration_service_1 = require("./user.registration.service");
const fetch_user_by_id_service_1 = require("../../user/services/fetch-user-by-id.service");
const fetch_user_by_email_service_1 = require("../../user/services/fetch-user-by-email.service");
let UserLoginService = class UserLoginService {
    constructor(jwtService, fetchUserByIdService, cacheService, userRegistrationService, fetchUserInfoByEmailService, userRepository) {
        this.jwtService = jwtService;
        this.fetchUserByIdService = fetchUserByIdService;
        this.cacheService = cacheService;
        this.userRegistrationService = userRegistrationService;
        this.fetchUserInfoByEmailService = fetchUserInfoByEmailService;
        this.userRepository = userRepository;
    }
    async login(user, userType) {
        const { email, id, phone } = user;
        const { roles = [], type } = (await this.fetchUserByIdService.execute(Number(id)));
        if (userType !== type) {
            throw new common_1.BadRequestException(`User with ${email || phone} not found.`);
        }
        const filteredRoles = roles.filter(role => role.is_active);
        const allPermissions = filteredRoles
            .reduce((acc, role) => [...acc, ...role.permissions], [])
            .map(({ id: permissionId, name }) => ({ id: permissionId, name }));
        const allRoles = filteredRoles.map(({ id: roleId, name }) => ({
            id: roleId,
            name,
        }));
        const accessToken = this.jwtService.sign({
            email,
            phone,
            id,
            roles: allRoles,
            permissions: allPermissions,
        });
        await this.cacheService.set(`user-token-${id}`, accessToken);
        return {
            id,
            access_token: accessToken,
            code: 200,
        };
    }
    async loginByGoogle(user) {
        let registerUser = (await this.fetchUserInfoByEmailService.execute(user.email, user_entity_1.UserType.USER));
        if (!registerUser) {
            registerUser = (await this.userRegistrationService.register({
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                password: ' ',
                google_auth: user.accessToken,
                image_url: user.picture,
                is_email_verified: true,
            }));
        }
        else {
            registerUser = {
                ...registerUser,
                first_name: user.first_name,
                last_name: user.lastName,
                google_auth: user.google_auth,
                image_url: user.picture,
            };
            await this.userRepository.save(registerUser);
        }
        const accessToken = this.jwtService.sign({
            email: registerUser.email,
            id: registerUser.id,
            roles: [],
            permissions: [],
        });
        await this.cacheService.set(`user-token-${registerUser.id}`, accessToken);
        return {
            access_token: accessToken,
            code: 200,
        };
    }
    async loginByFacebook(user) {
        let userProfileInfo = await this.userRepository.findOne({
            facebook_user_id: user.facebook_profile_id,
        });
        if (userProfileInfo) {
            userProfileInfo = {
                ...userProfileInfo,
                first_name: user.first_name,
                last_name: user.lastName,
                google_auth: user.facebook_auth,
                image_url: user.picture,
            };
            await this.userRepository.save(userProfileInfo);
        }
        else {
            userProfileInfo = (await this.userRegistrationService.register({
                first_name: user.firstName,
                last_name: user.lastName,
                password: ' ',
                facebook_auth: user.accessToken,
                image_url: user.picture,
                facebook_user_id: user.facebook_profile_id,
            }));
        }
        const accessToken = this.jwtService.sign({
            email: userProfileInfo === null || userProfileInfo === void 0 ? void 0 : userProfileInfo.email,
            id: userProfileInfo === null || userProfileInfo === void 0 ? void 0 : userProfileInfo.id,
            roles: [],
            permissions: [],
        });
        await this.cacheService.set(`user-token-${userProfileInfo === null || userProfileInfo === void 0 ? void 0 : userProfileInfo.id}`, accessToken);
        return {
            access_token: accessToken,
            code: 200,
        };
    }
};
UserLoginService = __decorate([
    common_1.Injectable(),
    __param(5, typeorm_2.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        fetch_user_by_id_service_1.FetchUserByIdService,
        common_services_1.CacheService,
        user_registration_service_1.UserRegistrationService,
        fetch_user_by_email_service_1.FetchUserInfoByEmailService,
        typeorm_1.Repository])
], UserLoginService);
exports.UserLoginService = UserLoginService;
//# sourceMappingURL=user.login.service.js.map