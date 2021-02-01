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
exports.OauthController = void 0;
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const create_client_service_1 = require("../services/oauth/create-client.service");
const authorize_service_1 = require("../services/oauth/authorize.service");
const token_service_1 = require("../services/oauth/token.service");
const client_request_1 = require("../requests/client.request");
const token_request_1 = require("../requests/token.request");
let OauthController = class OauthController {
    constructor(apiResponseService, createClientService, authorizeService, tokenService) {
        this.apiResponseService = apiResponseService;
        this.createClientService = createClientService;
        this.authorizeService = authorizeService;
        this.tokenService = tokenService;
    }
    async createClient(clientRequest, res) {
        const client = await this.createClientService.create(clientRequest);
        return this.apiResponseService.successResponse(['Client created successfully'], client, res);
    }
    async authorization(req, res, next) {
        const authorization = await this.authorizeService.authorize();
        req.user = {
            id: req.query.user_id,
            user_id: req.query.client_id,
        };
        return authorization(req, res, next);
    }
    async getToken(req, res) {
        return this.apiResponseService.successResponse(['Authorization successful'], {
            code: req.query.code,
        }, res);
    }
    async authorizationToken(tokenRequest, req, res, next) {
        const tokenHandler = await this.tokenService.execute();
        const { client_id: id, secret } = tokenRequest;
        req.client = {
            id,
            secret,
        };
        return tokenHandler(req, res, next);
    }
};
__decorate([
    common_1.Post('/client'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_request_1.ClientRequest, Object]),
    __metadata("design:returntype", Promise)
], OauthController.prototype, "createClient", null);
__decorate([
    common_1.Get('oauth/authorize'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OauthController.prototype, "authorization", null);
__decorate([
    common_1.Get('oauth/token'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OauthController.prototype, "getToken", null);
__decorate([
    common_1.Post('oauth/token'),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __param(3, common_1.Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [token_request_1.TokenRequest, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OauthController.prototype, "authorizationToken", null);
OauthController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [common_services_1.ApiResponseService,
        create_client_service_1.CreateClientService,
        authorize_service_1.AuthorizeService,
        token_service_1.TokenService])
], OauthController);
exports.OauthController = OauthController;
//# sourceMappingURL=oauth.controller.js.map