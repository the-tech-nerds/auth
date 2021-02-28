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
exports.SmsSingleService = void 0;
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sms_logs_entity_1 = require("../entities/sms-logs.entity");
const sms_service_1 = require("./sms.service");
let SmsSingleService = class SmsSingleService extends sms_service_1.SMSService {
    constructor(fetch, smsLogsRepository) {
        super();
        this.fetch = fetch;
        this.smsLogsRepository = smsLogsRepository;
        this.url = 'api/v3/send-sms';
        this.sid = 'KHANFRESHNONAPI';
        this.url = this.domain + this.url;
    }
    async sendSingleSMS(smsBody, res) {
        var _a;
        const response = await this.fetch.execute(this.url, {
            method: 'POST',
            body: this.getBodyData(smsBody),
        });
        if (((_a = response === null || response === void 0 ? void 0 : response.status) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === 'SUCCESS' ||
            response.status_code === 200) {
            await this.storeSMSLogs(this.getResponseFormattedDate(response, smsBody), this.smsLogsRepository);
            return 'success';
        }
        await this.storeSMSLogs(this.getResponseFormattedDate(response, smsBody), this.smsLogsRepository);
        return 'SMS send failed';
    }
    getBodyData(smsBody) {
        try {
            return {
                api_token: this.api_token,
                sid: this.sid,
                msisdn: smsBody.msisdn,
                sms: smsBody.text,
                csms_id: this.generateCSMSID(),
            };
        }
        catch (e) {
            return [];
        }
    }
    getResponseFormattedDate(response, smsBody) {
        var _a;
        try {
            return (((_a = response === null || response === void 0 ? void 0 : response.smsinfo) === null || _a === void 0 ? void 0 : _a.map((sms) => ({
                sid: this.sid,
                csms_id: sms.csms_id,
                api_token: this.api_token,
                msisdn: sms.msisdn,
                reference_id: sms.reference_id,
                body: sms.sms_body,
                purpose: smsBody.purpose,
                sms_lang: sms.sms_body,
                sms_status: sms.sms_status,
                status_message: sms.status_message,
                user_id: smsBody.user_id,
                status: response.status,
                code: response.status_code,
            }))) || []);
        }
        catch (e) {
            return [];
        }
    }
};
SmsSingleService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(sms_logs_entity_1.SMSLogs)),
    __metadata("design:paramtypes", [common_services_1.FetchService,
        typeorm_2.Repository])
], SmsSingleService);
exports.SmsSingleService = SmsSingleService;
//# sourceMappingURL=sms-single.service.js.map