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
exports.ResetPasswordRequest = void 0;
const class_validator_1 = require("class-validator");
class ResetPasswordRequest {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Old password is required.' }),
    __metadata("design:type", String)
], ResetPasswordRequest.prototype, "old_password", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'New password is required.' }),
    class_validator_1.MinLength(8, { message: 'Password must be atleast 8 characters' }),
    __metadata("design:type", String)
], ResetPasswordRequest.prototype, "new_password", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Password confirmation is required.' }),
    __metadata("design:type", String)
], ResetPasswordRequest.prototype, "new_password_confirm", void 0);
exports.ResetPasswordRequest = ResetPasswordRequest;
//# sourceMappingURL=reset-password.request.js.map