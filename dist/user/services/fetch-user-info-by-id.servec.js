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
exports.FetchUserInfoByIdService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let FetchUserInfoByIdService = class FetchUserInfoByIdService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(userId) {
        const userInfo = await this.usersRepository.findOne(userId, {
            relations: ['roles'],
        });
        if (userInfo) {
            return {
                id: userInfo.id,
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                email: userInfo.email,
                phone: userInfo.phone,
                image_url: userInfo.image_url,
                birthday: userInfo.birthday,
                is_mobile_verified: userInfo.is_mobile_verified,
                is_email_verified: userInfo.is_email_verified,
                is_facebook_login: !!userInfo.facebook_user_id,
                has_password: userInfo.password.length > 5,
                is_gmail_login: !!userInfo.google_auth,
                gender_type: userInfo.gender_type,
                roles: userInfo.roles,
            };
        }
        return undefined;
    }
};
FetchUserInfoByIdService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FetchUserInfoByIdService);
exports.FetchUserInfoByIdService = FetchUserInfoByIdService;
//# sourceMappingURL=fetch-user-info-by-id.servec.js.map