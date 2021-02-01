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
exports.InitializeOauthServerService = void 0;
const common_1 = require("@nestjs/common");
const authorization_service_1 = require("../authorization.service");
const serialize_client_service_1 = require("./serialize-client.service");
const deserialize_client_service_1 = require("./deserialize-client.service");
const grant_service_1 = require("./grant.service");
const exchange_service_1 = require("./exchange.service");
const oauth2orize = require('oauth2orize');
let InitializeOauthServerService = class InitializeOauthServerService extends authorization_service_1.AuthorizationService {
    constructor(serializeClientService, deserializeCLientService, grantService, exchangeService) {
        super();
        this.serializeClientService = serializeClientService;
        this.deserializeCLientService = deserializeCLientService;
        this.grantService = grantService;
        this.exchangeService = exchangeService;
        this.server = oauth2orize.createServer();
    }
    async initialize() {
        this.serializeClientService.execute(this.server);
        await this.deserializeCLientService.execute(this.server);
        await this.grantService.execute(this.server);
        await this.exchangeService.execute(this.server);
        return this.server;
    }
};
InitializeOauthServerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [serialize_client_service_1.SerializeClientService,
        deserialize_client_service_1.DeserializeClientService,
        grant_service_1.GrantService,
        exchange_service_1.ExchangeService])
], InitializeOauthServerService);
exports.InitializeOauthServerService = InitializeOauthServerService;
//# sourceMappingURL=initialize-oauth-server.service.js.map