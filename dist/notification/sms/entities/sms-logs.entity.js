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
exports.SMSLogs = void 0;
const typeorm_1 = require("typeorm");
let SMSLogs = class SMSLogs {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SMSLogs.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], SMSLogs.prototype, "sid", void 0);
__decorate([
    typeorm_1.Column({ length: 20 }),
    __metadata("design:type", String)
], SMSLogs.prototype, "csms_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], SMSLogs.prototype, "api_token", void 0);
__decorate([
    typeorm_1.Column({ length: 16 }),
    __metadata("design:type", String)
], SMSLogs.prototype, "msisdn", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], SMSLogs.prototype, "reference_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], SMSLogs.prototype, "body", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], SMSLogs.prototype, "purpose", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], SMSLogs.prototype, "sms_lang", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, length: 16 }),
    __metadata("design:type", String)
], SMSLogs.prototype, "sms_status", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], SMSLogs.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], SMSLogs.prototype, "status_message", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], SMSLogs.prototype, "user_id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: true }),
    __metadata("design:type", Date)
], SMSLogs.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ nullable: true }),
    __metadata("design:type", Date)
], SMSLogs.prototype, "updated_at", void 0);
SMSLogs = __decorate([
    typeorm_1.Entity()
], SMSLogs);
exports.SMSLogs = SMSLogs;
//# sourceMappingURL=sms-logs.entity.js.map