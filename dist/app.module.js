"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_services_1 = require("@the-tech-nerds/common-services");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const nest_router_1 = require("nest-router");
const jwt_1 = require("@nestjs/jwt");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const authorization_module_1 = require("./authorization/authorization.module");
const route_1 = require("./route");
const authentication_module_1 = require("./authentication/authentication.module");
const address_module_1 = require("./address/address.module");
const otp_module_1 = require("./otp/otp.module");
const configuration_1 = require("./config/configuration");
const login_config_1 = require("./config/login-config");
const password_module_1 = require("./password/password.module");
const auth_event_module_1 = require("./event-servcie/auth.event.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default, common_services_1.commonConfig, login_config_1.default],
            }),
            nest_router_1.RouterModule.forRoutes(route_1.routes),
            user_module_1.UserModule,
            address_module_1.AddressModule,
            authorization_module_1.AuthorizationModule,
            authentication_module_1.AuthenticationModule,
            otp_module_1.OtpModule,
            password_module_1.PasswordModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('jwt_secret'),
                    signOptions: { expiresIn: configService.get('jwt_expiration') },
                }),
                inject: [config_1.ConfigService],
            }),
            common_services_1.CacheModule,
            common_services_1.ApiResponseModule,
            auth_event_module_1.AuthEventModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map