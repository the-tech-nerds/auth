import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { User } from '../user.entity';
import { UserInput } from '../user';

import { ApiResponseService } from 'src/share/services/api-response/response/api-response.service';
import { Response } from 'express';

import { ListUsersService } from '../services/list-users.service';
import { CreateUserService } from '../services/create-user.service';
import { UpdateUsersService } from '../services/update-user.service';
import { GetByIdUserService } from '../services/getById-user.service';
import { DeleteUserService } from '../services/delete-user.service';

@Controller()
export class UserController {
  constructor(
    private readonly listUsersService: ListUsersService,
    private readonly createUserService: CreateUserService,
    private readonly updateUsersService: UpdateUsersService,
    private readonly getByIdUserService: GetByIdUserService,
    private readonly deleteUserService: DeleteUserService,

    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Get('/users')
    async getUsers( @Res() res: Response): Promise<Response<ResponseModel>>  {
        try {
            const data = await this.listUsersService.execute();
            return   this.apiResponseService.successResponse(['User list fetched successfully'], data as User[], res);
          } catch (e) {
            return this.apiResponseService.internalServerError([e.toString()], res);
          }
    }

  @Post('/user')
    async createUser(@Body() userInput: UserInput, @Res() res: Response): Promise<Response<ResponseModel>> {
        try {
            const data = await this.createUserService.execute(userInput);
            return   this.apiResponseService.successResponse(['User created successfully'], data as User, res);
          } catch (e) {
            return this.apiResponseService.internalServerError([e.toString()], res);
          }
    }

  @Put('/user/:id')
    async updateUser(@Param('id') id : number, @Body() userInput: UserInput, @Res() res: Response) : Promise<Response<ResponseModel>>  {
        try {
            const data = await this.updateUsersService.execute(id, userInput);
            return   this.apiResponseService.successResponse(['User has been updated successfully'], data as User, res);
          } catch (e) {
            return this.apiResponseService.internalServerError([e.toString()], res);
          }
    }

    @Get('/user/:id')
    async getUserById(@Param('id') id : number, @Res() res: Response  ): Promise<Response<ResponseModel>> {
        try {
            const data = await this.getByIdUserService.execute(id);
            return   this.apiResponseService.successResponse(['User fetched successfully'], data as User, res);
          } catch (e) {
            return this.apiResponseService.internalServerError([e.toString()], res);
          }
    }

    @Delete('/user/:id')
    async DeleteUser(@Param('id') id : number,  @Res() res: Response): Promise<Response<ResponseModel>>  {
        try {
            const data = await this.deleteUserService.execute(id);
            return   this.apiResponseService.successResponse(['User has been deleted successfully'], data, res);
          } catch (e) {
            return this.apiResponseService.internalServerError([e.toString()], res);
          }
    }
}