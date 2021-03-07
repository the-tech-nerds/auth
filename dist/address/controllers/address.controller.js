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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const address_request_1 = require("../requests/address.request");
const create_address_service_1 = require("../services/create-address.service");
const list_addresses_service_1 = require("../services/list-addresses.service");
const update_address_service_1 = require("../services/update-address.service");
const fetch_address_by_id_service_1 = require("../services/fetch-address-by-id.service");
const delete_address_service_1 = require("../services/delete-address.service");
let AddressController = class AddressController {
    constructor(createAddressService, listAddressesService, updateAddressService, fetchAddressByIdService, deleteAddressService, apiResponseService) {
        this.createAddressService = createAddressService;
        this.listAddressesService = listAddressesService;
        this.updateAddressService = updateAddressService;
        this.fetchAddressByIdService = fetchAddressByIdService;
        this.deleteAddressService = deleteAddressService;
        this.apiResponseService = apiResponseService;
    }
    async createAddress(userId, addressRequest, res) {
        addressRequest.user_id = userId;
        const data = await this.createAddressService.create(addressRequest);
        return this.apiResponseService.successResponse(['Address stored successfully'], data, res);
    }
    async getAddresses(res) {
        const data = await this.listAddressesService.execute();
        return this.apiResponseService.successResponse(['Address list fetched successfully'], data, res);
    }
    async updateAddress(userId, id, addressRequest, res) {
        addressRequest.user_id = userId;
        const data = await this.updateAddressService.execute(id, addressRequest);
        return this.apiResponseService.successResponse(['Address has been updated successfully'], data, res);
    }
    async getAddressById(id, res) {
        const data = await this.fetchAddressByIdService.execute(id);
        return this.apiResponseService.successResponse(['Address fetched successfully'], data, res);
    }
    async DeleteAddress(id, res) {
        const data = await this.deleteAddressService.execute(id);
        return this.apiResponseService.successResponse(['Address has been deleted successfully'], data, res);
    }
};
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Post('/'),
    __param(0, common_services_1.CurrentUser('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, address_request_1.AddressRequest, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "createAddress", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Get('/all'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getAddresses", null);
__decorate([
    common_1.UseGuards(common_services_1.UserGuard),
    common_1.Put('/:id'),
    __param(0, common_services_1.CurrentUser('id')),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, address_request_1.AddressRequest, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "updateAddress", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getAddressById", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "DeleteAddress", null);
AddressController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [create_address_service_1.CreateAddressService,
        list_addresses_service_1.ListAddressesService,
        update_address_service_1.UpdateAddressService,
        fetch_address_by_id_service_1.FetchAddressByIdService,
        delete_address_service_1.DeleteAddressService,
        common_services_1.ApiResponseService])
], AddressController);
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map