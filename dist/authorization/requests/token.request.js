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
exports.TokenRequest = void 0;
const class_validator_1 = require("class-validator");
class TokenRequest {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Client is required' }),
    __metadata("design:type", String)
], TokenRequest.prototype, "client_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Client secret is required' }),
    __metadata("design:type", String)
], TokenRequest.prototype, "secret", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Grant type is required' }),
    __metadata("design:type", String)
], TokenRequest.prototype, "grant_type", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Redirect uri is required' }),
    __metadata("design:type", String)
], TokenRequest.prototype, "redirect_uri", void 0);
exports.TokenRequest = TokenRequest;
//# sourceMappingURL=token.request.js.map