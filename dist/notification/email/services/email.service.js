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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const email_logs_entity_1 = require("../entities/email-logs.entity");
let EmailService = class EmailService {
    constructor(emailLogsRepository) {
        this.emailLogsRepository = emailLogsRepository;
    }
    async sendMail(email, res) {
        await res.render(email.template, { ...email.data }, (err, html) => {
            aws_sdk_1.config.update({ region: 'us-east-1' });
            new aws_sdk_1.SES({ apiVersion: '2010-12-01' })
                .sendEmail({
                Destination: {
                    CcAddresses: [...(email.cc || [])],
                    ToAddresses: [...email.to],
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: 'UTF-8',
                            Data: html,
                        },
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: email.subject,
                    },
                },
                Source: 'arifulcuet52@gmail.com',
                ReplyToAddresses: [],
            })
                .promise()
                .then((data) => this.saveEmailData(email, data, true))
                .catch((error) => this.saveEmailData(email, error, false));
        });
    }
    async saveEmailData(email, err_or_data, is_success) {
        await this.emailLogsRepository.save({
            to: JSON.stringify(email.to),
            from: email.from,
            cc: JSON.stringify(email.cc),
            bcc: JSON.stringify(email.bcc),
            subject: email.subject,
            body: email.body,
            template: email.template,
            data: JSON.stringify(email.data),
            purpose: email.purpose,
            tracking_id: email.tracking_id,
            tracking_type: email.tracking_type,
            delivery_status: is_success ? email_logs_entity_1.DeliveryStatus.SEND : email_logs_entity_1.DeliveryStatus.FAILED,
            attachments: JSON.stringify(email.attachments),
            aws_success_response: is_success
                ? JSON.stringify(err_or_data)
                : JSON.stringify(undefined),
            fail_reason: is_success
                ? JSON.stringify(undefined)
                : JSON.stringify(err_or_data),
        });
    }
};
EmailService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(email_logs_entity_1.EmailLogs)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map