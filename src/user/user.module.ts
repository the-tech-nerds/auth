import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './controllers/user.controller';

import { ListUsersService } from './services/list-users.service';
import { CreateUserService } from './services/create-user.service';
import { UpdateUsersService } from './services/update-user.service';
import { GetByIdUserService } from './services/getById-user.service';
import { DeleteUserService } from './services/delete-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ListUsersService, CreateUserService, UpdateUsersService, GetByIdUserService, DeleteUserService],
  controllers: [UserController],
})
export class UserModule {}
