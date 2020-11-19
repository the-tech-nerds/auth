import {
  Body, Controller, Delete, Get, Param, Put, Res,
} from '@nestjs/common';
import { ApiResponseService } from 'src/utils/services/api-response/response/api-response.service';
import { Response } from 'express';
import { User } from '../entities/user.entity';
// eslint-disable-next-line import/extensions
import { UserRequest } from '../requests/user.request';
import { ListUsersService } from '../services/list-users.service';
import { UpdateUsersService } from '../services/update-user.service';
import { FetchUserByIdService } from '../services/fetch-user-by-id.service';
import { DeleteUserService } from '../services/delete-user.service';

@Controller()
export class UserController {
  constructor(
    private readonly listUsersService: ListUsersService,
    private readonly updateUsersService: UpdateUsersService,
    private readonly fetchUserByIdService: FetchUserByIdService,
    private readonly deleteUserService: DeleteUserService,

    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Get('/users')
  async getUsers(@Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listUsersService.execute();
      return this.apiResponseService.successResponse(
        ['User list fetched successfully'],
        data as User[],
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @Put('/user/:id')
  async updateUser(
    @Param('id') id: number,
      @Body() userRequest: UserRequest,
      @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.updateUsersService.execute(id, userRequest);
      return this.apiResponseService.successResponse(
        ['User has been updated successfully'],
        data as User,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @Get('/user/:id')
  async getUserById(
    @Param('id') id: number,
      @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.fetchUserByIdService.execute(id);
      return this.apiResponseService.successResponse(
        ['User fetched successfully'],
        data as User,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @Delete('/user/:id')
  async DeleteUser(
    @Param('id') id: number,
      @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.deleteUserService.execute(id);
      return this.apiResponseService.successResponse(
        ['User has been deleted successfully'],
        data,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }
}
