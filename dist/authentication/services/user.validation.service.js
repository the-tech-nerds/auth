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
exports.UserValidationService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../user/entities/user.entity");
const user_verify_action_service_1 = require("./user.verify-action.service");
let UserValidationService = class UserValidationService {
    constructor(userRepository, userVerifyActionService, configService) {
        this.userRepository = userRepository;
        this.userVerifyActionService = userVerifyActionService;
        this.configService = configService;
    }
    async validate(userName, password, type) {
        const user = await this.userRepository.findOne({
            where: [
                { email: userName, type },
                { phone: userName, type },
            ],
        });
        if (!user) {
            throw new common_1.BadRequestException(`User with ${userName} not found`);
        }
        await this.userVerifyActionService.performUserFrozenCheckAction(user);
        const { password: hashedPassword, ...result } = user;
        const verify = await bcryptjs_1.compare(password, hashedPassword);
        if (!verify) {
            await this.userVerifyActionService.performFailedVerificationAction(user, userName);
            const loginLimit = this.configService.get('failed_login_limit');
            throw new common_1.BadRequestException(`Password did not match. You have ${loginLimit -
                user.failed_login_count} more attempt/s left`);
        }
        await this.userVerifyActionService.performSuccessVerificationAction(user, userName);
        return result;
    }
};
UserValidationService = __decorate([
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_verify_action_service_1.UserVerifyActionService,
        config_1.ConfigService])
], UserValidationService);
exports.UserValidationService = UserValidationService;
//# sourceMappingURL=user.validation.service.js.map