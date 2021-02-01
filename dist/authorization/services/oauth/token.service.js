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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const authorization_service_1 = require("../authorization.service");
const initialize_oauth_server_service_1 = require("./initialize-oauth-server.service");
let TokenService = class TokenService extends authorization_service_1.AuthorizationService {
    constructor(initializeOauthServerService) {
        super();
        this.initializeOauthServerService = initializeOauthServerService;
    }
    async execute() {
        const server = await this.initializeOauthServerService.initialize();
        return server.token();
    }
};
TokenService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [initialize_oauth_server_service_1.InitializeOauthServerService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map