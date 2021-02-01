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
exports.UpdateUserInfoesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const date_time_conversion_1 = require("../../utils/date-time-conversion/date-time-conversion");
const user_entity_1 = require("../entities/user.entity");
const fetch_user_info_by_id_servec_1 = require("./fetch-user-info-by-id.servec");
let UpdateUserInfoesService = class UpdateUserInfoesService {
    constructor(usersRepository, fetchUserInfoByIdService) {
        this.usersRepository = usersRepository;
        this.fetchUserInfoByIdService = fetchUserInfoByIdService;
    }
    async execute(id, userInfoUpdateRequest) {
        await this.usersRepository.update(id, {
            ...userInfoUpdateRequest,
            updated_by: id,
            updated_at: date_time_conversion_1.LocalDateToUtc(new Date()),
        });
        return this.fetchUserInfoByIdService.execute(id);
    }
};
UpdateUserInfoesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        fetch_user_info_by_id_servec_1.FetchUserInfoByIdService])
], UpdateUserInfoesService);
exports.UpdateUserInfoesService = UpdateUserInfoesService;
//# sourceMappingURL=update-user-info.service.js.map