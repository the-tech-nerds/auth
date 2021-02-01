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
exports.AccessToken = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../utils/entities/base-entity");
let AccessToken = class AccessToken extends base_entity_1.default {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], AccessToken.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AccessToken.prototype, "value", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], AccessToken.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AccessToken.prototype, "client_id", void 0);
AccessToken = __decorate([
    typeorm_1.Entity()
], AccessToken);
exports.AccessToken = AccessToken;
//# sourceMappingURL=access-token.entity.js.map