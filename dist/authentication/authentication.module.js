"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_services_1 = require("@the-tech-nerds/common-services");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const authentication_controller_1 = require("./controllers/authentication.controller");
const user_registration_service_1 = require("./services/user.registration.service");
const user_module_1 = require("../user/user.module");
const user_entity_1 = require("../user/entities/user.entity");
const permission_category_entity_1 = require("../authorization/entities/permission-category.entity");
const permission_entity_1 = require("../authorization/entities/permission.entity");
const role_entity_1 = require("../authorization/entities/role.entity");
const client_entity_1 = require("../authorization/entities/client.entity");
const access_code_entity_1 = require("../authorization/entities/access-code.entity");
const access_token_entity_1 = require("../authorization/entities/access-token.entity");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const user_login_service_1 = require("./services/user.login.service");
const local_strategy_1 = require("./strategies/local.strategy");
const user_validation_service_1 = require("./services/user.validation.service");
const fetch_user_by_id_service_1 = require("../user/services/fetch-user-by-id.service");
const user_logout_service_1 = require("./services/user.logout.service");
const fetch_user_by_email_service_1 = require("../user/services/fetch-user-by-email.service");
const login_history_entity_1 = require("../login-history/entities/login-history.entity");
const login_history_module_1 = require("../login-history/login-history.module");
const user_verify_action_service_1 = require("./services/user.verify-action.service");
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                permission_category_entity_1.PermissionCategories,
                permission_entity_1.Permissions,
                role_entity_1.Roles,
                client_entity_1.Client,
                access_code_entity_1.AccessCode,
                access_token_entity_1.AccessToken,
                user_entity_1.User,
                login_history_entity_1.LoginHistories,
            ]),
            common_services_1.CacheModule,
            user_module_1.UserModule,
            passport_1.PassportModule,
            login_history_module_1.LoginHistoryModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('jwt_secret'),
                    signOptions: { expiresIn: configService.get('jwt_expiration') },
                }),
                inject: [config_1.ConfigService],
            }),
            common_services_1.NotificationModule,
        ],
        providers: [
            user_registration_service_1.UserRegistrationService,
            user_login_service_1.UserLoginService,
            user_logout_service_1.UserLogoutService,
            user_validation_service_1.UserValidationService,
            user_verify_action_service_1.UserVerifyActionService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            fetch_user_by_id_service_1.FetchUserByIdService,
            fetch_user_by_email_service_1.FetchUserInfoByEmailService,
            common_services_1.ApiResponseService,
        ],
        controllers: [authentication_controller_1.AuthenticationController],
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map