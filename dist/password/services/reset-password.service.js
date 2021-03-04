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
exports.ResetPasswordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const user_entity_1 = require("../../user/entities/user.entity");
let ResetPasswordService = class ResetPasswordService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(resetPasswordRequest, user_id) {
        if (resetPasswordRequest.new_password
            !== resetPasswordRequest.new_password_confirm) {
            throw new common_1.BadRequestException('Sorry! Password confirmation did not match');
        }
        const user = await this.userRepository.findOneOrFail(user_id);
        const isPassMatching = await bcryptjs_1.compare(resetPasswordRequest.old_password, user.password);
        if (!isPassMatching) {
            throw new common_1.BadRequestException('Sorry! Provided password did not match with your current password');
        }
        user.password = await bcryptjs_1.hash(resetPasswordRequest.new_password, 10);
        await this.userRepository.save(user);
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
ResetPasswordService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ResetPasswordService);
exports.ResetPasswordService = ResetPasswordService;
//# sourceMappingURL=reset-password.service.js.map