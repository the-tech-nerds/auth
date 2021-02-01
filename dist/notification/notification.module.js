"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_services_1 = require("@the-tech-nerds/common-services");
const sms_controller_1 = require("./sms/controllers/sms.controller");
const sms_service_1 = require("./sms/services/sms.service");
const sms_single_service_1 = require("./sms/services/sms-single.service");
const sms_bulk_service_1 = require("./sms/services/sms-bulk.service");
const sms_dynamic_service_1 = require("./sms/services/sms-dynamic.service");
const sms_logs_entity_1 = require("./sms/entities/sms-logs.entity");
const email_controller_1 = require("./email/controllers/email.controller");
const email_logs_entity_1 = require("./email/entities/email-logs.entity");
const email_service_1 = require("./email/services/email.service");
let NotificationModule = class NotificationModule {
};
NotificationModule = __decorate([
    common_1.Module({
        controllers: [sms_controller_1.SmsController, email_controller_1.EmailController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sms_logs_entity_1.SMSLogs, email_logs_entity_1.EmailLogs]),
            common_services_1.FetchModule,
            common_services_1.ApiResponseModule,
        ],
        providers: [
            sms_service_1.SMSService,
            sms_single_service_1.SmsSingleService,
            sms_bulk_service_1.SmsBulkService,
            sms_dynamic_service_1.SmsDynamicService,
            email_service_1.EmailService,
        ],
        exports: [sms_single_service_1.SmsSingleService, email_service_1.EmailService],
    })
], NotificationModule);
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=notification.module.js.map