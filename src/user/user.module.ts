import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';

import { ListUsersService } from './services/list-users.service';
import { CreateUserService } from './services/create-user.service';
import { UpdateUsersService } from './services/update-user.service';
import { FetchUserByIdService } from './services/fetch-user-by-id.service';
import { DeleteUserService } from './services/delete-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    ListUsersService,
    CreateUserService,
    UpdateUsersService,
    FetchUserByIdService,
    DeleteUserService,
  ],
  controllers: [UserController],
})
export class UserModule {}
