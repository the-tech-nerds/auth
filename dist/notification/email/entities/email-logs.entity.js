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
exports.EmailLogs = exports.TrackingType = exports.DeliveryStatus = void 0;
const typeorm_1 = require("typeorm");
var DeliveryStatus;
(function (DeliveryStatus) {
    DeliveryStatus["GENERATED"] = "generated";
    DeliveryStatus["SEND"] = "send";
    DeliveryStatus["FAILED"] = "failed";
})(DeliveryStatus = exports.DeliveryStatus || (exports.DeliveryStatus = {}));
var TrackingType;
(function (TrackingType) {
    TrackingType["DEVICE"] = "device";
    TrackingType["USER"] = "user";
    TrackingType["TRANSACTION"] = "transaction";
})(TrackingType = exports.TrackingType || (exports.TrackingType = {}));
let EmailLogs = class EmailLogs {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], EmailLogs.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'json' }),
    __metadata("design:type", String)
], EmailLogs.prototype, "to", void 0);
__decorate([
    typeorm_1.Column({ length: 128 }),
    __metadata("design:type", String)
], EmailLogs.prototype, "from", void 0);
__decorate([
    typeorm_1.Column({ type: 'json', nullable: true }),
    __metadata("design:type", String)
], EmailLogs.prototype, "cc", void 0);
__decorate([
    typeorm_1.Column({ type: 'json', nullable: true }),
    __metadata("design:type", String)
], EmailLogs.prototype, "bcc", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EmailLogs.prototype, "subject", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EmailLogs.prototype, "body", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], EmailLogs.prototype, "template", void 0);
__decorate([
    typeorm_1.Column({ type: 'json', nullable: true }),
    __metadata("design:type", String)
], EmailLogs.prototype, "data", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EmailLogs.prototype, "purpose", void 0);
__decorate([
    typeorm_1.Column({
        comment: 'tracking id can be any one these one [device_key, user_id, transaction_id]',
    }),
    __metadata("design:type", String)
], EmailLogs.prototype, "tracking_id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: TrackingType,
        default: TrackingType.DEVICE,
    }),
    __metadata("design:type", String)
], EmailLogs.prototype, "tracking_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], EmailLogs.prototype, "fail_reason", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'json' }),
    __metadata("design:type", String)
], EmailLogs.prototype, "aws_success_response", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: DeliveryStatus,
        default: DeliveryStatus.GENERATED,
    }),
    __metadata("design:type", String)
], EmailLogs.prototype, "delivery_status", void 0);
__decorate([
    typeorm_1.Column({ type: 'json', nullable: true }),
    __metadata("design:type", String)
], EmailLogs.prototype, "attachments", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: true }),
    __metadata("design:type", Date)
], EmailLogs.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ nullable: true }),
    __metadata("design:type", Date)
], EmailLogs.prototype, "updated_at", void 0);
EmailLogs = __decorate([
    typeorm_1.Entity()
], EmailLogs);
exports.EmailLogs = EmailLogs;
//# sourceMappingURL=email-logs.entity.js.map