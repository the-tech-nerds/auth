import {
  Body, Controller, Get, Param, Put,
} from '@nestjs/common';
import { ListUsersService } from '../services/list-users.service';
import { User } from '../entities/user.entity';
import { UpdateUsersService } from '../services/update-user.service';
import { UserRequest } from '../requests/user.request';

@Controller()
export class UserController {
  constructor(
    private readonly listUsersService: ListUsersService,
    private readonly updateUsersService: UpdateUsersService,
  ) {}

  @Get('/users')
  getUsers(): Promise<User[]> {
    return this.listUsersService.execute();
  }

  @Put('/user/:id')
  updateUser(
    @Param('id') id: number,
      @Body() userRequest: UserRequest,
  ): Promise<User | undefined> {
    return this.updateUsersService.execute(id, userRequest);
  }
}
