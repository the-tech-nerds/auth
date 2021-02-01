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
exports.ForgetPasswordInitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const create_otp_service_1 = require("../../otp/services/create-otp.service");
const otp_request_1 = require("../../otp/requests/otp.request");
const user_entity_1 = require("../../user/entities/user.entity");
let ForgetPasswordInitService = class ForgetPasswordInitService {
    constructor(userRepository, createOtpService) {
        this.userRepository = userRepository;
        this.createOtpService = createOtpService;
    }
    async execute(forgetPasswordRequest, res) {
        const user = await this.userRepository.findOneOrFail({
            where: {
                phone: forgetPasswordRequest.phone,
                is_active: true,
            },
        });
        const otpReq = new otp_request_1.OtpRequest();
        otpReq.phone = user.phone;
        otpReq.purpose = 'forget-pass';
        return this.createOtpService.create(otpReq, res);
    }
};
ForgetPasswordInitService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        create_otp_service_1.CreateOtpService])
], ForgetPasswordInitService);
exports.ForgetPasswordInitService = ForgetPasswordInitService;
//# sourceMappingURL=forget-password-init.service.js.map