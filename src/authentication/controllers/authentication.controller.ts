import {
  Body, Controller, Post, Res,
} from '@nestjs/common';
import { UserRegistrationService } from '../services/user.registration.service';
import { UserRegistrationRequest } from '../requests/user.registration.request';
import { ApiResponseService } from '../../utils/services/api-response/response/api-response.service';

@Controller()
export class AuthenticationController {
  constructor(
    private readonly userRegistrationService :UserRegistrationService,
    private readonly apiResponseService: ApiResponseService,
  ) {
  }

  @Post('/register')
  async register(
  @Body() userRegistrationRequest: UserRegistrationRequest,
    @Res() res: any,
  ) {
    const user = await this.userRegistrationService.register(userRegistrationRequest);
    return this.apiResponseService.successResponse(
      ['Registered successfully'],
      user,
      res,
    );
  }
}
