import { ApiResponseService } from '@the-tech-nerds/common-services';
import { Response } from 'express';
import { UserRegistrationService } from '../services/user.registration.service';
import { UserRegistrationRequest } from '../requests/user.registration.request';
import { UserLoginService } from '../services/user.login.service';
import { UserLogoutService } from '../services/user.logout.service';
export declare class AuthenticationController {
    private readonly userRegistrationService;
    private readonly userLoginService;
    private readonly apiResponseService;
    private readonly userLogoutService;
    constructor(userRegistrationService: UserRegistrationService, userLoginService: UserLoginService, apiResponseService: ApiResponseService, userLogoutService: UserLogoutService);
    loginAdmin(req: any): Promise<any>;
    loginUser(req: any): Promise<any>;
    loginWithGmail(user: any): Promise<any>;
    loginWithFacebook(user: any): Promise<any>;
    registerAdmin(userRegistrationRequest: UserRegistrationRequest, res: any): Promise<Response<ResponseModel>>;
    registerUser(userRegistrationRequest: UserRegistrationRequest, res: any): Promise<Response<ResponseModel>>;
    logout(userId: any): Promise<void>;
    test(req: any, res: any): Response<ResponseModel>;
}
