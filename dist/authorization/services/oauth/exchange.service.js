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
exports.ExchangeService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const access_code_entity_1 = require("../../entities/access-code.entity");
const access_token_entity_1 = require("../../entities/access-token.entity");
const authorization_service_1 = require("../authorization.service");
const oauth2orize = require('oauth2orize');
let ExchangeService = class ExchangeService extends authorization_service_1.AuthorizationService {
    constructor(accessCodeRepository, accessTokenRepository, jwtService) {
        super();
        this.accessCodeRepository = accessCodeRepository;
        this.accessTokenRepository = accessTokenRepository;
        this.jwtService = jwtService;
    }
    async execute(server) {
        return server.exchange(oauth2orize.exchange.code({ userProperty: 'client' }, async (client, code, redirectUri, callback) => {
            try {
                const authCode = await this.accessCodeRepository.findOne({
                    value: code,
                });
                if (!authCode) {
                    return callback(null, false);
                }
                if (client.id.toString() !== authCode.client_id) {
                    return callback(null, false);
                }
                try {
                    await this.accessCodeRepository.remove(authCode);
                }
                catch (e) {
                    return callback(e);
                }
                const { client_id: clientId = '', user_id: userId = 0 } = authCode;
                const token = {
                    value: this.jwtService.sign({
                        client_id: clientId,
                        user_id: userId,
                    }),
                    client_id: clientId,
                    user_id: userId,
                    created_by: userId,
                };
                try {
                    const savedToken = await this.accessTokenRepository.save(token);
                    const accessToken = {
                        value: savedToken.value,
                        client_id: clientId,
                        user_id: userId,
                        id: savedToken.id,
                    };
                    return callback(null, accessToken, null, {
                        code: 200,
                        data: {
                            access_token: accessToken,
                        },
                    });
                }
                catch (e) {
                    return callback(e);
                }
            }
            catch (e) {
                return callback(e);
            }
        }));
    }
};
ExchangeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(access_code_entity_1.AccessCode)),
    __param(1, typeorm_1.InjectRepository(access_token_entity_1.AccessToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], ExchangeService);
exports.ExchangeService = ExchangeService;
//# sourceMappingURL=exchange.service.js.map