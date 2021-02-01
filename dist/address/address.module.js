"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_services_1 = require("@the-tech-nerds/common-services");
const address_entity_1 = require("./entities/address.entity");
const address_controller_1 = require("./controllers/address.controller");
const create_address_service_1 = require("./services/create-address.service");
const list_addresses_service_1 = require("./services/list-addresses.service");
const update_address_service_1 = require("./services/update-address.service");
const fetch_address_by_id_service_1 = require("./services/fetch-address-by-id.service");
const delete_address_service_1 = require("./services/delete-address.service");
let AddressModule = class AddressModule {
};
AddressModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([address_entity_1.Address])],
        providers: [
            list_addresses_service_1.ListAddressesService,
            create_address_service_1.CreateAddressService,
            update_address_service_1.UpdateAddressService,
            fetch_address_by_id_service_1.FetchAddressByIdService,
            delete_address_service_1.DeleteAddressService,
            common_services_1.ApiResponseService,
        ],
        controllers: [address_controller_1.AddressController],
    })
], AddressModule);
exports.AddressModule = AddressModule;
//# sourceMappingURL=address.module.js.map