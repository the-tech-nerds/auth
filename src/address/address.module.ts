import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { Address } from './entities/address.entity';
import { AddressController } from './controllers/address.controller';

import { CreateAddressService } from './services/create-address.service';
import { ListAddressesService } from './services/list-addresses.service';
import { UpdateAddressService } from './services/update-address.service';
import { FetchAddressByIdService } from './services/fetch-address-by-id.service';
import { DeleteAddressService } from './services/delete-address.service';
import { Division } from './entities/division.entity';
import { City } from './entities/city.entity';
import { Area } from './entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Division, City, Area])],
  providers: [
    ListAddressesService,
    CreateAddressService,
    UpdateAddressService,
    FetchAddressByIdService,
    DeleteAddressService,
    ApiResponseService,
  ],
  controllers: [AddressController],
})
export class AddressModule {}
