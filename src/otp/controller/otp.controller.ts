import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponseService } from '@technerds/common-services';
import { CreateOtpService } from '../services/create-otp.service';
import { ValidateOtpService } from '../services/validation-otp.service';
import { OtpRequest } from '../requests/otp.request';
import { OtpGenerateInfoResponse } from '../response/otp_generate_info.response';
import { OtpValidateRequest } from '../requests/otp-validate.request';

@Controller()
export class OtpController {
  constructor(
    private readonly createOtpService: CreateOtpService,
    private readonly validateOtpService: ValidateOtpService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Post('/generate')
  async generateOtp(
    @Body() otpRequest: OtpRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.createOtpService.create(otpRequest, res);
      return this.apiResponseService.successResponse(
        ['otp generate successfully'],
        data as OtpGenerateInfoResponse,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @Post('/validate')
  async validateOtp(
    @Body() otpValidateRequest: OtpValidateRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.validateOtpService.validate(otpValidateRequest);
      return this.apiResponseService.successResponse(
        ['Otp validated successfully'],
        data,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }
}
