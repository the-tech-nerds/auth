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
exports.SmsController = void 0;
const common_1 = require("@nestjs/common");
const sms_single_service_1 = require("../services/sms-single.service");
const single_sms_request_1 = require("../requests/single-sms.request");
let SmsController = class SmsController {
    constructor(smsSingleService) {
        this.smsSingleService = smsSingleService;
    }
    sendSMSSingle(smsData, res) {
        smsData.user_id = 62;
        return this.smsSingleService.sendSingleSMS({ ...smsData }, res);
    }
    sendSMSBulk(smsData) {
    }
    sendSMSDynamic(smsData) {
    }
};
__decorate([
    common_1.Post('single-sms'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [single_sms_request_1.SingleSmsRequest, Object]),
    __metadata("design:returntype", void 0)
], SmsController.prototype, "sendSMSSingle", null);
__decorate([
    common_1.Post('bulk-sms'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SmsController.prototype, "sendSMSBulk", null);
__decorate([
    common_1.Post('dynamic-sms'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SmsController.prototype, "sendSMSDynamic", null);
SmsController = __decorate([
    common_1.Controller('send'),
    __metadata("design:paramtypes", [sms_single_service_1.SmsSingleService])
], SmsController);
exports.SmsController = SmsController;
//# sourceMappingURL=sms.controller.js.map