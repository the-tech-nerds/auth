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
exports.OtpController = void 0;
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const create_otp_service_1 = require("../services/create-otp.service");
const validation_otp_service_1 = require("../services/validation-otp.service");
const otp_request_1 = require("../requests/otp.request");
const otp_validate_request_1 = require("../requests/otp-validate.request");
let OtpController = class OtpController {
    constructor(createOtpService, validateOtpService, apiResponseService) {
        this.createOtpService = createOtpService;
        this.validateOtpService = validateOtpService;
        this.apiResponseService = apiResponseService;
    }
    async generateOtp(otpRequest, res) {
        const data = await this.createOtpService.create(otpRequest, res);
        return this.apiResponseService.successResponse(['otp generate successfully'], data, res);
    }
    async validateOtp(otpValidateRequest, res) {
        const data = await this.validateOtpService.validate(otpValidateRequest);
        return this.apiResponseService.successResponse(['Otp validated successfully'], data, res);
    }
};
__decorate([
    common_1.Post('/generate'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_request_1.OtpRequest, Object]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "generateOtp", null);
__decorate([
    common_1.Post('/validate'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_validate_request_1.OtpValidateRequest, Object]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "validateOtp", null);
OtpController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [create_otp_service_1.CreateOtpService,
        validation_otp_service_1.ValidateOtpService,
        common_services_1.ApiResponseService])
], OtpController);
exports.OtpController = OtpController;
//# sourceMappingURL=otp.controller.js.map