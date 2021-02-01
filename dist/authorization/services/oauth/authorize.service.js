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
exports.AuthorizeService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const authorization_service_1 = require("../authorization.service");
const client_entity_1 = require("../../entities/client.entity");
const initialize_oauth_server_service_1 = require("./initialize-oauth-server.service");
let AuthorizeService = class AuthorizeService extends authorization_service_1.AuthorizationService {
    constructor(initializeOauthServerService, clientRepository) {
        super();
        this.initializeOauthServerService = initializeOauthServerService;
        this.clientRepository = clientRepository;
    }
    async authorize() {
        const server = await this.initializeOauthServerService.initialize();
        return server.authorization(async (clientId, redirectUri, callback) => {
            try {
                const client = await this.clientRepository.findOne({ id: clientId });
                if (!client) {
                    throw new common_1.UnauthorizedException('Unauthorized Client');
                }
                return callback(null, client, redirectUri);
            }
            catch (e) {
                return callback(e);
            }
        }, (req, res) => res(null, req, res));
    }
};
AuthorizeService = __decorate([
    __param(1, typeorm_1.InjectRepository(client_entity_1.Client)),
    __metadata("design:paramtypes", [initialize_oauth_server_service_1.InitializeOauthServerService,
        typeorm_2.Repository])
], AuthorizeService);
exports.AuthorizeService = AuthorizeService;
//# sourceMappingURL=authorize.service.js.map