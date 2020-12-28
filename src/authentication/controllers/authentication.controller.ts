import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  CurrentUser,
  HasPermissions,
  PermissionTypeEnum,
  PermissionTypes,
  UserGuard, // @ts-ignore
  ApiResponseService,
} from '@technerds/common-services';
import { Response } from 'express';
import { UserRegistrationService } from '../services/user.registration.service';
import { UserRegistrationRequest } from '../requests/user.registration.request';
import { UserLoginService } from '../services/user.login.service';
import { LocalGuard } from '../guards/local.guard';
import { UserLogoutService } from '../services/user.logout.service';
import { UserType } from '../../user/entities/user.entity';

@Controller()
export class AuthenticationController {
  constructor(
    private readonly userRegistrationService: UserRegistrationService,
    private readonly userLoginService: UserLoginService,
    private readonly apiResponseService: ApiResponseService,
    private readonly userLogoutService: UserLogoutService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('/login/admin')
  async loginAdmin(@Req() req: any): Promise<any> {
    return this.userLoginService.login(req.user, UserType.ADMIN);
  }

  @UseGuards(LocalGuard)
  @Post('/login/user')
  async loginUser(@Req() req: any): Promise<any> {
    return this.userLoginService.login(req.user, UserType.USER);
  }

  @Post('/login/gmail')
  async loginWithGmail(@Body() user: any): Promise<any> {
    return this.userLoginService.loginByGoogle(user);
  }

  @Post('/login/facebook')
  async loginWithFacebook(@Body() user: any): Promise<any> {
    return this.userLoginService.loginByFacebook(user);
  }

  @HasPermissions(
    [PermissionTypes.USER.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/register/admin')
  async registerAdmin(
    @Body() userRegistrationRequest: UserRegistrationRequest,
    @Res() res: any,
  ): Promise<Response<ResponseModel>> {
    const user = await this.userRegistrationService.register({
      ...userRegistrationRequest,
      type: 1,
    });
    return this.apiResponseService.successResponse(
      ['Registered successfully'],
      user,
      res,
    );
  }

  @Post('/register/user')
  async registerUser(
    @Body() userRegistrationRequest: UserRegistrationRequest,
    @Res() res: any,
  ): Promise<Response<ResponseModel>> {
    const user = await this.userRegistrationService.register(
      userRegistrationRequest,
    );
    return this.apiResponseService.successResponse(
      ['Registered successfully'],
      user,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Get('/logout')
  async logout(@CurrentUser('id') userId: any): Promise<void> {
    await this.userLogoutService.logout(userId);
  }

  @UseGuards(UserGuard)
  @HasPermissions([PermissionTypes.USER.GET], PermissionTypeEnum.hasPermission)
  @Get('/test')
  test(@Request() req: any, @Res() res: any): Response<ResponseModel> {
    return this.apiResponseService.successResponse(
      ['Test user data'],
      req.user,
      res,
    );
  }
}
