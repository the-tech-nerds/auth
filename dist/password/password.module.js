"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_services_1 = require("@the-tech-nerds/common-services");
const password_management_controller_1 = require("./controllers/password-management.controller");
const forget_password_init_service_1 = require("./services/forget-password-init.service");
const forget_password_complete_service_1 = require("./services/forget-password-complete.service");
const user_entity_1 = require("../user/entities/user.entity");
const reset_password_service_1 = require("./services/reset-password.service");
const otp_module_1 = require("../otp/otp.module");
const create_password_servic_e_1 = require("./services/create-password.servic e");
const reset_password_auto_generate_service_1 = require("./services/reset-password-auto-generate.service");
let PasswordModule = class PasswordModule {
};
PasswordModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), otp_module_1.OtpModule, common_services_1.NotificationModule],
        providers: [
            common_services_1.ApiResponseService,
            forget_password_init_service_1.ForgetPasswordInitService,
            forget_password_complete_service_1.ForgetPasswordCompleteService,
            reset_password_service_1.ResetPasswordService,
            common_services_1.ApiResponseService,
            create_password_servic_e_1.CreatePasswordService,
            reset_password_auto_generate_service_1.ResetPasswordAutoGenerateService,
        ],
        controllers: [password_management_controller_1.PasswordManagementController],
    })
], PasswordModule);
exports.PasswordModule = PasswordModule;
//# sourceMappingURL=password.module.js.map