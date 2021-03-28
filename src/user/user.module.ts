import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApiResponseService,
  CacheModule,
  UploadService,
  FileService,
} from '@the-tech-nerds/common-services';

import { FileStorage } from './entities/storage.entity';
import { User } from './entities/user.entity';

import { UserController } from './controllers/user.controller';
import { ListUsersService } from './services/list-users.service';
import { UpdateUsersService } from './services/update-user.service';
import { FetchUserByIdService } from './services/fetch-user-by-id.service';
import { GetAddressesByUserService } from './services/get-addresses-by-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { AssignRolesInUserService } from './services/assign-role-in-user.service';
import { Roles } from '../authorization/entities/role.entity';
import { FetchUserInfoByIdService } from './services/fetch-user-info-by-id.servec';
import { UpdateUserInfoesService } from './services/update-user-info.service';
import { UpdatePhoneVerifiedService } from './services/verified-phone.service';
import { UpdatePhoneService } from './services/update-phone.service';
import { UpdateEmailService } from './services/update-email.service';
import { FetchUserInfoByPhoneService } from './services/fetch-user-by-phone.service';
import { FetchUserInfoByEmailService } from './services/fetch-user-by-email.service';
import { UpdateUserFreezeStatusService } from './services/update-user-freeze-status.service';

import { UserMockCreateService } from './services/user-mock-create.service';
import { UserShopMapping } from './entities/user-shop.entity';
import { CreateUserShopService } from './services/user-shop/create-user-shop.service';
import { UserShopsService } from './services/user-shop/list-by-user-id.service';
import { UpdateUserShopsService } from './services/user-shop/update.user-shop.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Roles, FileStorage, UserShopMapping]),
    CacheModule,
  ],
  providers: [
    ApiResponseService,
    ListUsersService,
    UpdateUsersService,
    FetchUserByIdService,
    GetAddressesByUserService,
    DeleteUserService,
    AssignRolesInUserService,
    FetchUserInfoByIdService,
    UpdateUserInfoesService,
    UpdatePhoneVerifiedService,
    UpdatePhoneService,
    UploadService,
    UpdateEmailService,
    FetchUserInfoByPhoneService,
    FetchUserInfoByEmailService,
    UpdateUserFreezeStatusService,
    UserMockCreateService,
    CreateUserShopService,
    UserShopsService,
    UpdateUserShopsService,
    FileService,
  ],
  exports: [UpdateUsersService, CreateUserShopService, UserShopsService],
  controllers: [UserController],
})
export class UserModule {}
