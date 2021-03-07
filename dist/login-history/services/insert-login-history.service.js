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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertLoginHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const login_history_entity_1 = require("../entities/login-history.entity");
let InsertLoginHistoryService = class InsertLoginHistoryService {
    constructor(loginHistoriesRepository) {
        this.loginHistoriesRepository = loginHistoriesRepository;
    }
    async execute(loginHistoryRequest) {
        const isEmail = loginHistoryRequest.userName.includes('@');
        const loginHistoryData = {
            phone: isEmail ? null : loginHistoryRequest.userName,
            email: isEmail ? loginHistoryRequest.userName : null,
            request_source: loginHistoryRequest.request_source,
            status: loginHistoryRequest.status,
        };
        const data = this.loginHistoriesRepository.save({
            ...loginHistoryData,
            created_by: 0,
        });
    }
};
InsertLoginHistoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(login_history_entity_1.LoginHistories)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InsertLoginHistoryService);
exports.InsertLoginHistoryService = InsertLoginHistoryService;
//# sourceMappingURL=insert-login-history.service.js.map