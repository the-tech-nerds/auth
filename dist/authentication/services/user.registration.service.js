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
exports.UserRegistrationService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const user_entity_1 = require("../../user/entities/user.entity");
const utils_1 = require("../../utils/utils");
let UserRegistrationService = class UserRegistrationService {
    constructor(userRepository, emailNotification) {
        this.userRepository = userRepository;
        this.emailNotification = emailNotification;
    }
    async register(userData) {
        const { password = '', type = user_entity_1.UserType.USER, email = undefined, phone = undefined, } = userData;
        const user = await this.userRepository.findOne({
            where: [
                { email, type },
                { phone, type },
            ],
        });
        if (user) {
            throw new common_1.BadRequestException('Account already exist for this email or phone number.');
        }
        const passwordToSave = type === user_entity_1.UserType.ADMIN ? utils_1.uid(10) : password;
        if (email && type === user_entity_1.UserType.ADMIN) {
            this.emailNotification.send({
                template: 'authentication/admin-user-create',
                to: [email],
                subject: 'Admin Invitation for Khan Fresh Corner BD!',
                data: {
                    loginUrl: process.env.LOGIN_URL,
                    email,
                    password: passwordToSave,
                },
            });
        }
        const { first_name: firstName, last_name: lastName, email: savedEmail, phone: savedPhone, image_url: imageUrl, id, } = await this.userRepository.save({
            ...userData,
            type,
            password: passwordToSave.length > 4
                ? await bcryptjs_1.hash(passwordToSave, 10)
                : passwordToSave,
            created_by: 1,
        });
        return {
            first_name: firstName,
            last_name: lastName,
            email: savedEmail,
            image_url: imageUrl,
            id,
            phone: savedPhone,
        };
    }
};
UserRegistrationService = __decorate([
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_services_1.EmailNotification])
], UserRegistrationService);
exports.UserRegistrationService = UserRegistrationService;
//# sourceMappingURL=user.registration.service.js.map