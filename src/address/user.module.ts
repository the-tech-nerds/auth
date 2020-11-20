import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';

import { ListAddressesService } from './services/list-users.service';
import { CreateUserService } from './services/create-user.service';
import { UpdateUsersService } from './services/update-user.service';
import { FetchAddressByIdService } from './services/fetch-user-by-id.service';
import { DeleteAddressService } from './services/delete-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    ListAddressesService,
    CreateUserService,
    UpdateUsersService,
    FetchAddressByIdService,
    DeleteAddressService,
  ],
  controllers: [UserController],
})
export class UserModule {}
