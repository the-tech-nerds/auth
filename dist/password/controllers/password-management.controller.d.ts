import { ApiResponseService } from '@the-tech-nerds/common-services';
import { Response } from 'express';
import { ForgetPasswordInitRequest } from '../requests/forget-password-init.request';
import { ForgetPasswordInitService } from '../services/forget-password-init.service';
import { ForgetPasswordCompleteRequest } from '../requests/forget-password-complete.request';
import { ResetPasswordRequest } from '../requests/reset-password.request';
import { ForgetPasswordCompleteService } from '../services/forget-password-complete.service';
import { ResetPasswordService } from '../services/reset-password.service';
import { CreatePasswordRequest } from '../requests/create-password.request';
import { CreatePasswordService } from '../services/create-password.servic e';
import { ResetPasswordAutoGenerateService } from '../services/reset-password-auto-generate.service';
import { ResetPasswordAutoGenerateRequest } from '../requests/reset-password-auto-generate.request';
export declare class PasswordManagementController {
    private readonly forgetPasswordInitService;
    private readonly forgetPasswordCompleteService;
    private readonly resetPasswordService;
    private readonly createPasswordService;
    private readonly apiResponseService;
    private readonly resetPasswordAutoGenerateService;
    constructor(forgetPasswordInitService: ForgetPasswordInitService, forgetPasswordCompleteService: ForgetPasswordCompleteService, resetPasswordService: ResetPasswordService, createPasswordService: CreatePasswordService, apiResponseService: ApiResponseService, resetPasswordAutoGenerateService: ResetPasswordAutoGenerateService);
    recoverForgetPassInit(request: ForgetPasswordInitRequest, res: Response): Promise<Response<ResponseModel>>;
    recoverForgetPassComplete(userType: string, request: ForgetPasswordCompleteRequest, res: Response): Promise<Response<ResponseModel>>;
    resetPassword(userId: any, request: ResetPasswordRequest, res: Response): Promise<Response<ResponseModel>>;
    resetAdminPassword(request: ResetPasswordAutoGenerateRequest, userId: any, res: Response): Promise<Response<ResponseModel>>;
    createPassword(userId: any, request: CreatePasswordRequest, res: Response): Promise<Response<ResponseModel>>;
}
