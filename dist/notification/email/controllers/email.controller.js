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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const email_request_1 = require("../requests/email.request");
const email_service_1 = require("../services/email.service");
const email_logs_entity_1 = require("../entities/email-logs.entity");
let EmailController = class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    sendEmail(email, res) {
        email.template = 'email-template';
        email.purpose = 'registration';
        email.tracking_type = email_logs_entity_1.TrackingType.USER;
        email.from = 'thetechnerdss@gmail.com';
        email.tracking_id = 'test241564';
        email.tracking_id = 'TEST';
        email.subject = 'Registration';
        email.data = { message: 'Hello Bangladesh ' };
        return this.emailService.sendMail(email, res);
    }
};
__decorate([
    common_1.Post('email'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_request_1.EMAILRequest, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "sendEmail", null);
EmailController = __decorate([
    common_1.Controller('send'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
exports.EmailController = EmailController;
//# sourceMappingURL=email.controller.js.map