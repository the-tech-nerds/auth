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
exports.Address = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../utils/entities/base-entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Address = class Address extends base_entity_1.default {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Address.prototype, "id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: 'user_id' }),
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.id),
    __metadata("design:type", Number)
], Address.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "details", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Address.prototype, "area_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Address.prototype, "city_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Address.prototype, "division_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Address.prototype, "postcode", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "contact_no", void 0);
__decorate([
    typeorm_1.Column('double', { nullable: true }),
    __metadata("design:type", Number)
], Address.prototype, "lat", void 0);
__decorate([
    typeorm_1.Column('double', { nullable: true }),
    __metadata("design:type", Number)
], Address.prototype, "long", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Address.prototype, "is_default", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Address.prototype, "is_active", void 0);
Address = __decorate([
    typeorm_1.Entity()
], Address);
exports.Address = Address;
//# sourceMappingURL=address.entity.js.map