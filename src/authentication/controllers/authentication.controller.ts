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
  UserGuard,
} from '@technerds/common-services';
import { UserRegistrationService } from '../services/user.registration.service';
import { UserRegistrationRequest } from '../requests/user.registration.request';
import { ApiResponseService } from '../../utils/services/api-response/response/api-response.service';
import { UserLoginService } from '../services/user.login.service';
import { LocalGuard } from '../guards/local.guard';
import { UserLogoutService } from '../services/user.logout.service';

@Controller()
export class AuthenticationController {
  constructor(
    private readonly userRegistrationService: UserRegistrationService,
    private readonly userLoginService: UserLoginService,
    private readonly apiResponseService: ApiResponseService,
    private readonly userLogoutService: UserLogoutService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(@Req() req: any) {
    return this.userLoginService.login(req.user);
  }

  @Post('/login/gmail')
  async loginWithGmail(@Body() user: any) {
    return this.userLoginService.loginByGoogle(user);
  }

  @Post('/login/facebook')
  async loginWithFacebook(@Body() user: any) {
    return this.userLoginService.loginByFacebook(user);
  }

  @Post('/register')
  async register(
    @Body() userRegistrationRequest: UserRegistrationRequest,
    @Res() res: any,
  ) {
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
  async logout(@CurrentUser('id') userId: any) {
    await this.userLogoutService.logout(userId);
  }

  @UseGuards(UserGuard)
  @HasPermissions([PermissionTypes.USER.GET], PermissionTypeEnum.hasPermission)
  @Get('/test')
  test(@Request() req: any, @Res() res: any) {
    return this.apiResponseService.successResponse(
      ['Test user data'],
      req.user,
      res,
    );
  }
}
