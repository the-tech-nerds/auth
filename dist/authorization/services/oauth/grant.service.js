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
exports.GrantService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const authorization_service_1 = require("../authorization.service");
const access_code_entity_1 = require("../../entities/access-code.entity");
const utils_1 = require("../../../utils/utils");
const oauth2orize = require('oauth2orize');
let GrantService = class GrantService extends authorization_service_1.AuthorizationService {
    constructor(accessCodeRepository) {
        super();
        this.accessCodeRepository = accessCodeRepository;
    }
    async execute(server) {
        const that = this;
        server.grant(oauth2orize.grant.code(async (client, redirectUri, user, ares, callback) => {
            const code = {
                value: utils_1.uid(16),
                client_id: client.id,
                user_id: user.id,
            };
            try {
                await that.accessCodeRepository.save(code);
                return callback(null, code.value);
            }
            catch (e) {
                return callback(e);
            }
        }));
    }
};
GrantService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(access_code_entity_1.AccessCode)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GrantService);
exports.GrantService = GrantService;
//# sourceMappingURL=grant.service.js.map