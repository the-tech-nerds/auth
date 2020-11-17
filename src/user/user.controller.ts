import {
  Controller, Get,
} from '@nestjs/common';
import { ListUsersService } from './list-users.service';
import { User } from './user.entity';

@Controller()
export class UserController {
  constructor(
    private readonly listUsersService: ListUsersService,
  ) {}

  @Get('/users')
  getUsers(@Body() dto: UserInput): Promise<User[]> {
    return this.listUsersService.execute();
  }
}
