import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
} from '@the-tech-nerds/common-services';
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
import { UpdateEmailService } from '../services/update-email.service';
import { UpdateEmailRequest } from '../requests/update-email.request';
import { FetchUserInfoByEmailService } from '../services/fetch-user-by-email.service';
import { FetchUserInfoByPhoneService } from '../services/fetch-user-by-phone.service';
import { UpdateUserFreezeStatusService } from '../services/update-user-freeze-status.service';
import { UpdateUserShopsService } from '../services/user-shop/update.user-shop.service';
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
    private readonly updateEmailService: UpdateEmailService,
    private readonly fetchUserInfoByEmailService: FetchUserInfoByEmailService,
    private readonly fetchUserInfoByPhoneService: FetchUserInfoByPhoneService,

    private readonly updateUserFreezeStatusService: UpdateUserFreezeStatusService,
    private readonly updateUserShopService: UpdateUserShopsService,
  ) {}

  @UseGuards(UserGuard)
  @HasPermissions([PermissionTypes.USER.GET], PermissionTypeEnum.hasPermission)
  @Get('/all')
  async getUsers(
    @Query('userType') userType: string,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.listUsersService.execute(userType);
    return this.apiResponseService.successResponse(
      ['User list fetched successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
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
    const data = await this.updateUsersService.execute(id, userUpdateRequest);
    return this.apiResponseService.successResponse(
      ['User has been updated successfully'],
      data as User,
      res,
    );
  }

  @HasPermissions(
    [PermissionTypes.USER.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/:id/unfreeze')
  async unfreezeUser(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateUserFreezeStatusService.unfreezeUser(id);
    return this.apiResponseService.successResponse(
      ['User has been unfrozen successfully'],
      data as User,
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.USER.DETAILS],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/:id')
  async getUserById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchUserByIdService.execute(id);
    return this.apiResponseService.successResponse(
      ['User fetched successfully'],
      data as User,
      res,
    );
  }

  // @UseGuards(UserGuard)
  @Get('/profile/info')
  async getUserInfoById(
    @CurrentUser('id') userId: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchUserInfoByIdService.execute(userId);
    return this.apiResponseService.successResponse(
      ['User fetched successfully'],
      data as UserResponse,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Put('/profile/info')
  async updateUserInfo(
    @CurrentUser('id') userId: any,
    @Body() userInfoUpdateRequest: UserInfoUpdateRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateUserInfoService.execute(
      userId,
      userInfoUpdateRequest,
    );
    return this.apiResponseService.successResponse(
      ['User has been updated successfully'],
      data as User,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Put('/phone/verify')
  async VerifyPhoneNumber(
    @CurrentUser('id') userId: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updatePhoneVerifiedService.execute(userId);
    return this.apiResponseService.successResponse(
      ['Mobile verified successfully'],
      data as Boolean,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Put('/update/phone')
  async UpdatePhoneNumber(
    @CurrentUser('id') userId: any,
    @Body() request: UpdatePhoneRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    request.user_id = userId;
    const data = await this.updatePhoneService.execute(request);
    return this.apiResponseService.successResponse(
      ['Mobile updated successfully'],
      data as Boolean,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Put('/update/email')
  async UpdateEmail(
    @CurrentUser('id') userId: any,
    @Body() updateEmailRequest: UpdateEmailRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateEmailService.execute(
      updateEmailRequest,
      userId,
    );
    return this.apiResponseService.successResponse(
      ['Email updated successfully'],
      data as Boolean,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Get('/:id/addresses')
  async getAddressByUser(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.getAddressesByUserService.execute(id);
    return this.apiResponseService.successResponse(
      ['User Addresses fetched successfully'],
      data as Address[],
      res,
    );
  }

  @UseGuards(UserGuard)
  @HasPermissions(
    [PermissionTypes.USER.DELETE],
    PermissionTypeEnum.hasPermission,
  )
  @Delete('/:id')
  async DeleteUser(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.deleteUserService.execute(id);
    return this.apiResponseService.successResponse(
      ['User has been deleted successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
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
    const data = await this.assignRolesInUserService.assign(
      id,
      userAssignRolesRequest.roles,
    );
    return this.apiResponseService.successResponse(
      ['Role Assign successfully'],
      data,
      res,
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @UploadedFile() file: any,
    @Body() content: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const model = JSON.parse(content.fileStoreInfo);
    return this.uploadService
      .upload(file, undefined, model.folder, model.entity)
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

  @Get('/check/email')
  async getUserByEmail(
    @Query('userType') userType: string,
    @Query('email') email: string,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchUserInfoByEmailService.execute(
      email,
      Number(userType),
      true,
    );
    return this.apiResponseService.successResponse(
      ['User  fetched successfully'],
      data,
      res,
    );
  }

  @Get('/check/phone')
  async getUserByPhone(
    @Query('userType') userType: string,
    @Query('phone') phone: string,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchUserInfoByPhoneService.execute(
      phone,
      Number(userType),
    );
    return this.apiResponseService.successResponse(
      ['User  fetched successfully'],
      data,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Put('/update/shop')
  async UpdateUserShop(
    @Query('id') userId: any,
    @Body() shopIds: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateUserShopService.execute(userId, shopIds);
    return this.apiResponseService.successResponse(
      ['User shop updated successfully'],
      data as Boolean,
      res,
    );
  }
}
