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
exports.UserVerifyActionService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const date_time_conversion_1 = require("../../utils/date-time-conversion/date-time-conversion");
const insert_login_history_service_1 = require("../../login-history/services/insert-login-history.service");
const update_user_service_1 = require("../../user/services/update-user.service");
let UserVerifyActionService = class UserVerifyActionService {
    constructor(insertLoginHistoryService, updateUsersService, configService) {
        this.insertLoginHistoryService = insertLoginHistoryService;
        this.updateUsersService = updateUsersService;
        this.configService = configService;
    }
    async performUserFrozenCheckAction(user) {
        if (user.is_frozen) {
            const currentDate = date_time_conversion_1.CurrentDate('YYYY-MM-DD HH:mm:ss');
            if (currentDate >= date_time_conversion_1.UtcDateToLocal(user.unfreeze_at)) {
                user.is_frozen = false;
                user.failed_login_count -= 1;
                await this.updateUsersService.execute(user.id, user);
            }
            else {
                throw new common_1.BadRequestException('Sorry! your account is temporarily blocked. Try again later.');
            }
        }
    }
    async performFailedVerificationAction(user, userName) {
        const loginHistoryData = {
            userName,
            request_source: user.type,
            status: false,
        };
        await this.insertLoginHistoryService.execute(loginHistoryData);
        user.failed_login_count += 1;
        if (user.failed_login_count >= this.configService.get('failed_login_limit')) {
            user.is_frozen = true;
            user.unfreeze_at = date_time_conversion_1.LocalDateToUtc(date_time_conversion_1.addMinutes(new Date(), this.configService.get('block_time')));
            await this.updateUsersService.execute(user.id, user);
            throw new common_1.BadRequestException('Sorry! your account is temporarily blocked. Try again later.');
        }
        await this.updateUsersService.execute(user.id, user);
    }
    async performSuccessVerificationAction(user, userName) {
        user.failed_login_count = 0;
        user.unfreeze_at = new Date();
        user.last_login_at = new Date();
        await this.updateUsersService.execute(user.id, user);
        const loginHistoryData = {
            userName,
            request_source: user.type,
            status: true,
        };
        await this.insertLoginHistoryService.execute(loginHistoryData);
    }
};
UserVerifyActionService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [insert_login_history_service_1.InsertLoginHistoryService,
        update_user_service_1.UpdateUsersService,
        config_1.ConfigService])
], UserVerifyActionService);
exports.UserVerifyActionService = UserVerifyActionService;
//# sourceMappingURL=user.verify-action.service.js.map