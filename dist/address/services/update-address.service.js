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
exports.UpdateAddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const date_time_conversion_1 = require("../../utils/date-time-conversion/date-time-conversion");
const address_entity_1 = require("../entities/address.entity");
let UpdateAddressService = class UpdateAddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async execute(id, addressRequest) {
        await this.addressRepository.update(id, {
            ...addressRequest,
            updated_by: 1,
            updated_at: date_time_conversion_1.LocalDateToUtc(new Date()),
        });
        return this.addressRepository.findOne(id);
    }
};
UpdateAddressService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(address_entity_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UpdateAddressService);
exports.UpdateAddressService = UpdateAddressService;
//# sourceMappingURL=update-address.service.js.map