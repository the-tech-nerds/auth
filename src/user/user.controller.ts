import {
  Body, Controller, Get, Param, Post, Put,
} from '@nestjs/common';
import { ListUsersService } from './list-users.service';
import { User } from './user.entity';
import {UserInput} from './user';
import { CreateUserService } from './create-user.service';
import { UpdateUsersService } from './update-user.service';

@Controller()
export class UserController {
  constructor(
    private readonly listUsersService: ListUsersService,
    private readonly createUserService: CreateUserService,
    private readonly updateUsersService: UpdateUsersService,
  ) {}

  @Get('/users')
  getUsers(): Promise<User[]> {
    return this.listUsersService.execute();
  }

  @Post('/user')
  createUser(@Body() userInput: UserInput): Promise<User> {
    return this.createUserService.execute(userInput);
  }

  @Put('/user/:id')
  updateUser(@Param('id') id : number, @Body() userInput: UserInput) : Promise<UserInput>  {
     const res = this.updateUsersService.execute(id, userInput);
     return res;
  }
}
