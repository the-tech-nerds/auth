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
exports.CreateClientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("../../entities/client.entity");
const authorization_service_1 = require("../authorization.service");
const utils_1 = require("../../../utils/utils");
let CreateClientService = class CreateClientService extends authorization_service_1.AuthorizationService {
    constructor(clientRepository) {
        super();
        this.clientRepository = clientRepository;
    }
    async create(clientRequest) {
        const { name } = clientRequest;
        return this.clientRepository.save({
            name,
            secret: utils_1.uid(64),
            created_by: 1,
        });
    }
};
CreateClientService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CreateClientService);
exports.CreateClientService = CreateClientService;
//# sourceMappingURL=create-client.service.js.map