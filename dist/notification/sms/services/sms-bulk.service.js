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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsBulkService = void 0;
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const sms_service_1 = require("./sms.service");
let SmsBulkService = class SmsBulkService extends sms_service_1.SMSService {
    constructor(fetch) {
        super();
        this.fetch = fetch;
        this.url = 'api/v3/send-sms/bulk';
        this.sid = 'KHANFRESHNONBULK';
        this.url = this.domain + this.url;
    }
    async sendBulkSMS(smsBody) {
        await this.fetch
            .execute(this.url, {
            method: 'POST',
            body: {
                api_token: this.api_token,
                sid: this.sid,
                msisdn: [...smsBody.msisdn],
                sms: smsBody.text,
                batch_csms_id: smsBody.batch_csms_id,
            },
        })
            .then(res => res.data);
    }
};
SmsBulkService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_services_1.FetchService])
], SmsBulkService);
exports.SmsBulkService = SmsBulkService;
//# sourceMappingURL=sms-bulk.service.js.map