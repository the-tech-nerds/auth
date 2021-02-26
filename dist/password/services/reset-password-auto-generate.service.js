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
exports.ResetPasswordAutoGenerateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const common_services_1 = require("@the-tech-nerds/common-services");
const user_entity_1 = require("../../user/entities/user.entity");
const utils_1 = require("../../utils/utils");
let ResetPasswordAutoGenerateService = class ResetPasswordAutoGenerateService {
    constructor(userRepository, emailNotification) {
        this.userRepository = userRepository;
        this.emailNotification = emailNotification;
    }
    async execute(user_id) {
        const user = (await this.userRepository.findOne(user_id));
        const { email = null, first_name: firstName } = user;
        if (!email) {
            throw new common_1.BadRequestException('This is user is not associated with an email, '
                + 'cannot reset password');
        }
        const newGeneratedPassword = utils_1.uid(10);
        const updatedUser = {
            ...user,
            password: await bcryptjs_1.hash(newGeneratedPassword, 10),
        };
        await this.userRepository.save({
            ...updatedUser,
        });
        this.emailNotification.send({
            template: 'authentication/admin-reset-password',
            to: [email],
            subject: `New password for ${firstName}!`,
            data: {
                name: `${firstName}`,
                password: newGeneratedPassword,
            },
        });
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            image_url: user.image_url,
            birthday: user.birthday,
            is_mobile_verified: user.is_mobile_verified,
            gender_type: user.gender_type,
        };
    }
};
ResetPasswordAutoGenerateService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_services_1.EmailNotification])
], ResetPasswordAutoGenerateService);
exports.ResetPasswordAutoGenerateService = ResetPasswordAutoGenerateService;
//# sourceMappingURL=reset-password-auto-generate.service.js.map