import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { AddressController } from './controllers/address.controller';

import { CreateAddressService } from './services/create-address.service';
import { ListAddressesService } from './services/list-addresses.service';
import { UpdateAddressService } from './services/update-address.service';
import { FetchAddressByIdService } from './services/fetch-address-by-id.service';
import { DeleteAddressService } from './services/delete-address.service';
import { ApiResponseService } from '../utils/services/api-response/response/api-response.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [
    ApiResponseService,
    ListAddressesService,
    CreateAddressService,
    UpdateAddressService,
    FetchAddressByIdService,
    DeleteAddressService,
  ],
  controllers: [AddressController],
})
export class AddressModule {}
