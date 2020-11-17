import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { ListUsersService } from './services/list-users.service';
import { UpdateUsersService } from './services/update-user.service';
import { FetchUserByIdService } from './services/fetch-user-by-id.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ListUsersService, UpdateUsersService, FetchUserByIdService],
  controllers: [UserController],
})
export class UserModule {}
