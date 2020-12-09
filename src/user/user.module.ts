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
import { AssignRolesInUserService } from './services/assign-role-in-user.service';
import { Roles } from '../authorization/entities/role.entity';
import { FetchUserInfoByIdService } from './services/fetch-user-info-by-id.servec';
import { UpdateUserInfoesService } from './services/update-user-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Roles])],
  providers: [
    ListUsersService,
    UpdateUsersService,
    FetchUserByIdService,
    GetAddressesByUserService,
    DeleteUserService,
    AssignRolesInUserService,
    ApiResponseService,
    FetchUserInfoByIdService,
    UpdateUserInfoesService,
  ],
  controllers: [UserController],
})
export class UserModule {}
