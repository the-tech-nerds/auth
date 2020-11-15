import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { ListUsersService } from './list-users.service';
import { CreateUserService } from './create-user.service';
import { UpdateUsersService } from './update-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ListUsersService, CreateUserService, UpdateUsersService],
  controllers: [UserController],
})
export class UserModule {}
