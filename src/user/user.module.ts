import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';

import { ListUsersService } from './services/list-users.service';
import { UpdateUsersService } from './services/update-user.service';
import { FetchUserByIdService } from './services/fetch-user-by-id.service';
import { GetAddressesByUserService } from './services/get-addresses-by-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { ApiResponseService } from '../utils/services/api-response/response/api-response.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    ApiResponseService,
    ListUsersService,
    UpdateUsersService,
    FetchUserByIdService,
    GetAddressesByUserService,
    DeleteUserService,
  ],
  controllers: [UserController],
})
export class UserModule {}
