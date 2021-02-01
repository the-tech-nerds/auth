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
exports.CreatePasswordRequest = void 0;
const class_validator_1 = require("class-validator");
class CreatePasswordRequest {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'User id is required.' }),
    __metadata("design:type", Number)
], CreatePasswordRequest.prototype, "user_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'New password is required.' }),
    class_validator_1.MinLength(8, { message: 'Password must be at least 8 characters' }),
    __metadata("design:type", String)
], CreatePasswordRequest.prototype, "new_password", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Password confirmation is required.' }),
    __metadata("design:type", String)
], CreatePasswordRequest.prototype, "new_password_confirm", void 0);
exports.CreatePasswordRequest = CreatePasswordRequest;
//# sourceMappingURL=create-password.request.js.map