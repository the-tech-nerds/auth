import { Response } from 'express';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { CreateOtpService } from '../services/create-otp.service';
import { ValidateOtpService } from '../services/validation-otp.service';
import { OtpRequest } from '../requests/otp.request';
import { OtpValidateRequest } from '../requests/otp-validate.request';
export declare class OtpController {
    private readonly createOtpService;
    private readonly validateOtpService;
    private readonly apiResponseService;
    constructor(createOtpService: CreateOtpService, validateOtpService: ValidateOtpService, apiResponseService: ApiResponseService);
    generateOtp(otpRequest: OtpRequest, res: Response): Promise<Response<ResponseModel>>;
    validateOtp(otpValidateRequest: OtpValidateRequest, res: Response): Promise<Response<ResponseModel>>;
}
