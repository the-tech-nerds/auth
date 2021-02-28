"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSService = void 0;
const common_1 = require("@nestjs/common");
let SMSService = class SMSService {
    constructor() {
        this.domain = 'https://smsplus.sslwireless.com/';
        this.api_token = '9595b67e-cb2e-47e4-801e-5b19321eb52f';
        this.sid = 'KHANFRESHNONAPI';
    }
    generateCSMSID(key = '') {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        try {
            for (let i = 0; i < 20; i += 1) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return key + result.substr(0, 20);
        }
        catch (e) {
            return result;
        }
    }
    async storeSMSLogs(smsLogs, repo) {
        const sls = await repo.save(smsLogs);
        return sls;
    }
};
SMSService = __decorate([
    common_1.Injectable()
], SMSService);
exports.SMSService = SMSService;
//# sourceMappingURL=sms.service.js.map