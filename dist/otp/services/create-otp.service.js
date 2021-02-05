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
exports.CreateOtpService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_services_1 = require("@the-tech-nerds/common-services");
const otp_entity_1 = require("../entities/otp.entity");
const date_time_conversion_1 = require("../../utils/date-time-conversion/date-time-conversion");
let CreateOtpService = class CreateOtpService {
    constructor(otpsRepository, emailNotification, smsNotification) {
        this.otpsRepository = otpsRepository;
        this.emailNotification = emailNotification;
        this.smsNotification = smsNotification;
    }
    async create(otpRequest, res) {
        if (otpRequest.email && otpRequest.phone) {
            throw new common_1.BadRequestException('Please select only email or phone number.');
        }
        await this.checkOtpAvailability(otpRequest.phone, otpRequest.email);
        const otp = this.generateOTP(4);
        const otpModel = await this.otpsRepository.save({
            ...otpRequest,
            code: otp,
            time_sent: date_time_conversion_1.LocalDateToUtc(new Date()),
            expiration_time: date_time_conversion_1.LocalDateToUtc(date_time_conversion_1.addMinutes(new Date(), 1)),
        });
        if (otpRequest.phone) {
            await this.smsNotification.singleSmsSend({
                msisdn: otpRequest.phone === undefined ? '' : otpRequest.phone,
                purpose: otpRequest.purpose,
                text: `your otp is: ${otp}`,
                user_id: 0,
            });
        }
        if (otpRequest.email) {
            this.emailNotification.send({
                template: 'authentication/otp',
                to: [otpRequest.email],
                subject: `Otp for ${otpRequest.purpose}`,
                data: {
                    otp,
                },
            });
        }
        const response = {
            info: 'OTP have sent',
            sent_number: otpRequest.phone,
            sent_email: otpRequest.email,
            purpose: otpRequest.purpose,
            expire_time: otpModel.expiration_time,
        };
        return response;
    }
    async checkOtpAvailability(mobile, email) {
        const currentUTCDate = date_time_conversion_1.LocalDateToUtc(new Date());
        let otpCount = 0;
        let validOtp = null;
        if (mobile) {
            otpCount = await this.otpsRepository.count({
                phone: mobile,
                time_sent: typeorm_2.Between(date_time_conversion_1.subtractDay(currentUTCDate, 30), currentUTCDate),
            });
        }
        if (email) {
            otpCount = await this.otpsRepository.count({
                email,
                time_sent: typeorm_2.Between(date_time_conversion_1.subtractDay(currentUTCDate, 30), currentUTCDate),
            });
        }
        if (otpCount > 30) {
            throw new common_1.BadRequestException('Monthly otp limit exceed .');
        }
        if (mobile) {
            validOtp = await this.otpsRepository.findOne({
                phone: mobile,
                expiration_time: typeorm_2.MoreThan(currentUTCDate),
                status: false,
            });
        }
        if (email) {
            validOtp = await this.otpsRepository.findOne({
                email,
                expiration_time: typeorm_2.MoreThan(currentUTCDate),
                status: false,
            });
        }
        if (validOtp) {
            throw new common_1.BadRequestException('please try after sometimes.');
        }
        return true;
    }
    generateOTP(length) {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < length; i += 1) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
};
CreateOtpService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(otp_entity_1.Otps)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_services_1.EmailNotification,
        common_services_1.SmsNotification])
], CreateOtpService);
exports.CreateOtpService = CreateOtpService;
//# sourceMappingURL=create-otp.service.js.map