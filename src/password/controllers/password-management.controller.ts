import { Body, Controller, Post, Res } from '@nestjs/common';

import { ApiResponseService } from '@technerds/common-services';
import { Response } from 'express';
import { ForgetPasswordInitRequest } from '../requests/forget-password-init.request';

import { ForgetPasswordInitService } from '../services/forget-password-init.service';
import { ForgetPasswordCompleteRequest } from '../requests/forget-password-complete.request';
import { ResetPasswordRequest } from '../requests/reset-password.request';

import { ForgetPasswordCompleteService } from '../services/forget-password-complete.service';
import { ResetPasswordService } from '../services/reset-password.service';
import { UserResponse } from '../../user/response/user.response';

@Controller()
export class PasswordManagementController {
  constructor(
    private readonly forgetPasswordInitService: ForgetPasswordInitService,
    private readonly forgetPasswordCompleteService: ForgetPasswordCompleteService,
    private readonly resetPasswordService: ResetPasswordService,

    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Post('/recover/init')
  async recoverForgetPassInit(
    @Body() request: ForgetPasswordInitRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.forgetPasswordInitService.execute(request);
      return this.apiResponseService.successResponse([data.info], null, res);
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @Post('/recover/complete')
  async recoverForgetPassComplete(
    @Body() request: ForgetPasswordCompleteRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.forgetPasswordCompleteService.execute(request);
      return this.apiResponseService.successResponse(
        ['Password has been updated successfully'],
        data as UserResponse,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @Post('/reset')
  async resetPassword(
    @Body() request: ResetPasswordRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.resetPasswordService.execute(request);
      return this.apiResponseService.successResponse(
        ['Password has been reset successfully'],
        data as UserResponse,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }
}
