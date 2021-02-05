"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_services_1 = require("@the-tech-nerds/common-services");
const user_module_1 = require("../user/user.module");
const otp_entity_1 = require("./entities/otp.entity");
const create_otp_service_1 = require("./services/create-otp.service");
const validation_otp_service_1 = require("./services/validation-otp.service");
const otp_controller_1 = require("./controller/otp.controller");
let OtpModule = class OtpModule {
};
OtpModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([otp_entity_1.Otps]),
            user_module_1.UserModule,
            common_services_1.NotificationModule,
        ],
        providers: [create_otp_service_1.CreateOtpService, validation_otp_service_1.ValidateOtpService, common_services_1.ApiResponseService],
        controllers: [otp_controller_1.OtpController],
        exports: [create_otp_service_1.CreateOtpService],
    })
], OtpModule);
exports.OtpModule = OtpModule;
//# sourceMappingURL=otp.module.js.map