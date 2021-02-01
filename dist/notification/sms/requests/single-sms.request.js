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
exports.SingleSmsRequest = void 0;
const class_validator_1 = require("class-validator");
class SingleSmsRequest {
}
__decorate([
    class_validator_1.Matches(/^01[3456789][0-9]{8}$/, {
        message: 'Mobile no should be a valid number',
    }),
    class_validator_1.MaxLength(11, { message: 'Mobile no Should be 11 digit' }),
    __metadata("design:type", String)
], SingleSmsRequest.prototype, "msisdn", void 0);
__decorate([
    class_validator_1.MaxLength(100, { message: 'A sms should not greater than 100 character' }),
    __metadata("design:type", String)
], SingleSmsRequest.prototype, "text", void 0);
__decorate([
    class_validator_1.MinLength(3, { message: 'Please define the purpose of this sms' }),
    __metadata("design:type", String)
], SingleSmsRequest.prototype, "purpose", void 0);
exports.SingleSmsRequest = SingleSmsRequest;
//# sourceMappingURL=single-sms.request.js.map