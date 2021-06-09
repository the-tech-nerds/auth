import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { Address } from './entities/address.entity';
import { AddressController } from './controllers/address.controller';

import { CreateAddressService } from './services/create-address.service';
import { ListAddressesService } from './services/list-addresses.service';
import { UpdateAddressService } from './services/update-address.service';
import { DeleteAddressService } from './services/delete-address.service';
import { Division } from './entities/division.entity';
import { City } from './entities/city.entity';
import { Area } from './entities/area.entity';
import { ListCityService } from './services/city/fetch-cities.service';
import { ListDivisionService } from './services/division/fetch-division.service';
import { ListAreaService } from './services/area/area.service';
import { CityController } from './controllers/city.controller';
import { AreaController } from './controllers/area.controller';
import { DivisionController } from './controllers/division.controller';
import { MakeDefaultAddressService } from './services/make-default.service';
import { FetchAddressByIdService } from './services/fetch-address-by-id.service';
import { ListAddressesByUserIdService } from './services/fetch-address-by-userId.service';
import { DefaultAddressByUserIdService } from './services/default-address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Division, City, Area])],
  providers: [
    ListAddressesService,
    CreateAddressService,
    UpdateAddressService,
    FetchAddressByIdService,
    DeleteAddressService,
    ApiResponseService,
    ListCityService,
    ListDivisionService,
    ListAreaService,
    MakeDefaultAddressService,
    ListAddressesByUserIdService,
    DefaultAddressByUserIdService,
  ],
  controllers: [
    AddressController,
    DivisionController,
    CityController,
    AreaController,
  ],
})
export class AddressModule {}
