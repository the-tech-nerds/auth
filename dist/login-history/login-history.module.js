"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_services_1 = require("@the-tech-nerds/common-services");
const login_history_entity_1 = require("./entities/login-history.entity");
const insert_login_history_service_1 = require("./services/insert-login-history.service");
let LoginHistoryModule = class LoginHistoryModule {
};
LoginHistoryModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([login_history_entity_1.LoginHistories])],
        providers: [insert_login_history_service_1.InsertLoginHistoryService, common_services_1.ApiResponseService],
        controllers: [],
        exports: [insert_login_history_service_1.InsertLoginHistoryService],
    })
], LoginHistoryModule);
exports.LoginHistoryModule = LoginHistoryModule;
//# sourceMappingURL=login-history.module.js.map