import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';

import { ApiResponseService } from 'src/utils/services/api-response/response/api-response.service';
import { Response } from 'express';
import { CurrentUser, UserGuard } from '@technerds/common-services';
import { User } from '../entities/user.entity';
import { UserUpdateRequest } from '../requests/user-update.request';

import { ListUsersService } from '../services/list-users.service';
import { UpdateUsersService } from '../services/update-user.service';
import { FetchUserByIdService } from '../services/fetch-user-by-id.service';
import { DeleteUserService } from '../services/delete-user.service';
import { GetAddressesByUserService } from '../services/get-addresses-by-user.service';

import { Address } from '../../address/entities/address.entity';
import { UserAssignRolesRequest } from '../requests/user-assign-permission.request';
import { AssignRolesInUserService } from '../services/assign-role-in-user.service';
import { FetchUserInfoByIdService } from '../services/fetch-user-info-by-id.servec';
import { UserResponse } from '../response/user.response';
import { UserInfoUpdateRequest } from '../requests/user-info-update.request';
import { UpdateUserInfoesService } from '../services/update-user-info.service';

@Controller()
export class UserController {
  constructor(
    private readonly listUsersService: ListUsersService,
    private readonly updateUsersService: UpdateUsersService,
    private readonly fetchUserByIdService: FetchUserByIdService,
    private readonly getAddressesByUserService: GetAddressesByUserService,
    private readonly assignRolesInUserService: AssignRolesInUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly apiResponseService: ApiResponseService,
    private readonly fetchUserInfoByIdService: FetchUserInfoByIdService,
    private readonly updateUserInfoService: UpdateUserInfoesService,
  ) {}

  @Get('/all')
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

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() userUpdateRequest: UserUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.updateUsersService.execute(id, userUpdateRequest);
      return this.apiResponseService.successResponse(
        ['User has been updated successfully'],
        data as User,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @Get('/:id')
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

  @UseGuards(UserGuard)
  @Get('/info')
  async getUserInfoById(
    @CurrentUser('id') userId: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      console.log('userId', userId);
      const data = await this.fetchUserInfoByIdService.execute(userId);
      return this.apiResponseService.successResponse(
        ['User fetched successfully'],
        data as UserResponse,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @Put('/info/:id')
  async updateUserInfo(
    @Param('id') id: number,
    @Body() userInfoUpdateRequest: UserInfoUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.updateUserInfoService.execute(
        id,
        userInfoUpdateRequest,
      );
      return this.apiResponseService.successResponse(
        ['User has been updated successfully'],
        data as User,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @Get('/:id/addresses')
  async getAddressByUser(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.getAddressesByUserService.execute(id);
      return this.apiResponseService.successResponse(
        ['User Addresses fetched successfully'],
        data as Address[],
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @Delete('/:id')
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

  @Post('/:id/assign-roles')
  async AssignPermission(
    @Param('id') id: number,
    @Body() userAssignRolesRequest: UserAssignRolesRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.assignRolesInUserService.assign(
        id,
        userAssignRolesRequest.roles,
      );
      return this.apiResponseService.successResponse(
        ['Role Assign successfully'],
        data,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError(
        ['Something went wrong! please try again later'],
        res,
      );
    }
  }
}
