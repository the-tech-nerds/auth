import {
  Body, Controller, Get, Post, Req, Request, Res, UseGuards,
} from '@nestjs/common';
import { UserRegistrationService } from '../services/user.registration.service';
import { UserRegistrationRequest } from '../requests/user.registration.request';
import { ApiResponseService } from '../../utils/services/api-response/response/api-response.service';
import { UserLoginService } from '../services/user.login.service';
import { LocalGuard } from '../guards/local.guard';
import { UserGuard } from '../guards/user.guard';

@Controller()
export class AuthenticationController {
  constructor(
    private readonly userRegistrationService: UserRegistrationService,
    private readonly userLoginService: UserLoginService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(
  @Req() req: any,
  ) {
    return this.userLoginService.login(req.user);
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
  @Get('/test')
  test(@Request() req: any) {
    return 'something';
  }
}
