import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';

import {
  ApiResponseService,
  CurrentUser,
  UserGuard,
} from '@technerds/common-services';
import { Response } from 'express';
import { ForgetPasswordInitRequest } from '../requests/forget-password-init.request';

import { ForgetPasswordInitService } from '../services/forget-password-init.service';
import { ForgetPasswordCompleteRequest } from '../requests/forget-password-complete.request';
import { ResetPasswordRequest } from '../requests/reset-password.request';

import { ForgetPasswordCompleteService } from '../services/forget-password-complete.service';
import { ResetPasswordService } from '../services/reset-password.service';
import { UserResponse } from '../../user/response/user.response';
import { CreatePasswordRequest } from '../requests/create-password.request';
import { CreatePasswordService } from '../services/create-password.servic e';

@Controller()
export class PasswordManagementController {
  constructor(
    private readonly forgetPasswordInitService: ForgetPasswordInitService,
    private readonly forgetPasswordCompleteService: ForgetPasswordCompleteService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly createPasswordService: CreatePasswordService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Post('/recover/init')
  async recoverForgetPassInit(
    @Body() request: ForgetPasswordInitRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.forgetPasswordInitService.execute(request, res);
    return this.apiResponseService.successResponse([data.info], null, res);
  }

  @Post('/recover/complete')
  async recoverForgetPassComplete(
    @Body() request: ForgetPasswordCompleteRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.forgetPasswordCompleteService.execute(request);
    return this.apiResponseService.successResponse(
      ['Password has been updated successfully'],
      data as UserResponse,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Post('/reset')
  async resetPassword(
    @CurrentUser('id') userId: any,
    @Body() request: ResetPasswordRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.resetPasswordService.execute(request, userId);
    return this.apiResponseService.successResponse(
      ['Password has been reset successfully'],
      data as UserResponse,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Post('/create')
  async createPassword(
    @CurrentUser('id') userId: any,
    @Body() request: CreatePasswordRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    request.user_id = userId;
    const data = await this.createPasswordService.execute(request);
    return this.apiResponseService.successResponse(
      ['Password has been created successfully'],
      data as Boolean,
      res,
    );
  }
}
