import {
  Body, Controller, Get, Post,
} from '@nestjs/common';
import { ListUsersService } from './list-users.service';
import { User } from './user.entity';
import { CreateUserService } from './create-user.service';

@Controller()
export class UserController {
  constructor(
    private readonly listUsersService: ListUsersService,
    private readonly createUserService: CreateUserService,
  ) {}

  @Get('/users')
  getUsers(): Promise<User[]> {
    return this.listUsersService.execute();
  }

  @Post('/user')
  createUser(@Body() userInput: UserInput): User {
    return this.createUserService.execute(userInput);
  }
}
