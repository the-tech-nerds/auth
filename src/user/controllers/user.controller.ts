import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Response } from 'express';
import {
  CurrentUser,
  UserGuard,
  // @ts-ignore
  ApiResponseService,
  HasPermissions,
  PermissionTypes,
  PermissionTypeEnum,
  // @ts-ignore
  UploadService,
} from '@technerds/common-services';
import { FileInterceptor } from '@nestjs/platform-express';
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
import { UpdatePhoneVerifiedService } from '../services/verified-phone.service';
import { UpdatePhoneRequest } from '../requests/update-phone.request';
import { UpdatePhoneService } from '../services/update-phone.service';

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
    private readonly updatePhoneVerifiedService: UpdatePhoneVerifiedService,
    private readonly updatePhoneService: UpdatePhoneService,

    private readonly uploadService: UploadService,
  ) {}

  @HasPermissions([PermissionTypes.USER.GET], PermissionTypeEnum.hasPermission)
  @Get('/all')
  async getUsers(@Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listUsersService.execute();
      return this.apiResponseService.successResponse(
        ['User list fetched successfully'],
        data,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @HasPermissions(
    [PermissionTypes.USER.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
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

  @HasPermissions(
    [PermissionTypes.USER.DETAILS],
    PermissionTypeEnum.hasPermission,
  )
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

  @HasPermissions(
    [PermissionTypes.USER.DETAILS],
    PermissionTypeEnum.hasPermission,
  )
  @UseGuards(UserGuard)
  @Get('/profile/info')
  async getUserInfoById(
    @CurrentUser('id') userId: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
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

  @HasPermissions(
    [PermissionTypes.USER.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @UseGuards(UserGuard)
  @Put('/profile/info')
  async updateUserInfo(
    @CurrentUser('id') userId: any,
    @Body() userInfoUpdateRequest: UserInfoUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.updateUserInfoService.execute(
        userId,
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

  @UseGuards(UserGuard)
  @Put('/phone/verify')
  async VerifyPhoneNumber(
    @CurrentUser('id') userId: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.updatePhoneVerifiedService.execute(userId);
      return this.apiResponseService.successResponse(
        ['Mobile verified successfully'],
        data as Boolean,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @UseGuards(UserGuard)
  @Put('/update/phone')
  async UpdatePhoneNumber(
    @CurrentUser('id') userId: any,
    @Body() request: UpdatePhoneRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      request.user_id = userId;
      const data = await this.updatePhoneService.execute(request);
      return this.apiResponseService.successResponse(
        ['Mobile updated successfully'],
        data as Boolean,
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

  @HasPermissions(
    [PermissionTypes.USER.DELETE],
    PermissionTypeEnum.hasPermission,
  )
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

  @HasPermissions(
    [PermissionTypes.USER.ROLE_ASSIGN],
    PermissionTypeEnum.hasPermission,
  )
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() file: any, @Res() res: Response) {
    const fileName = `example_${Math.ceil(Math.random() * 100)}`;
    return this.uploadService
      .upload(file, fileName)
      .then((response: any) =>
        this.apiResponseService.successResponse(
          ['Image Uploaded successfully'],
          response,
          res,
        ),
      )
      .catch((error: any) =>
        this.apiResponseService.internalServerError(
          ['Something went wrong! please try again later'],
          res,
        ),
      );
  }
}
