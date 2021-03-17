import { Response } from 'express';
import { ApiResponseService, UploadService } from '@the-tech-nerds/common-services';
import { UserUpdateRequest } from '../requests/user-update.request';
import { ListUsersService } from '../services/list-users.service';
import { UpdateUsersService } from '../services/update-user.service';
import { FetchUserByIdService } from '../services/fetch-user-by-id.service';
import { DeleteUserService } from '../services/delete-user.service';
import { GetAddressesByUserService } from '../services/get-addresses-by-user.service';
import { UserAssignRolesRequest } from '../requests/user-assign-permission.request';
import { AssignRolesInUserService } from '../services/assign-role-in-user.service';
import { FetchUserInfoByIdService } from '../services/fetch-user-info-by-id.servec';
import { UserInfoUpdateRequest } from '../requests/user-info-update.request';
import { UpdateUserInfoesService } from '../services/update-user-info.service';
import { UpdatePhoneVerifiedService } from '../services/verified-phone.service';
import { UpdatePhoneRequest } from '../requests/update-phone.request';
import { UpdatePhoneService } from '../services/update-phone.service';
import { UpdateEmailService } from '../services/update-email.service';
import { UpdateEmailRequest } from '../requests/update-email.request';
import { FetchUserInfoByEmailService } from '../services/fetch-user-by-email.service';
import { FetchUserInfoByPhoneService } from '../services/fetch-user-by-phone.service';
import { UpdateUserFreezeStatusService } from '../services/update-user-freeze-status.service';
export declare class UserController {
    private readonly listUsersService;
    private readonly updateUsersService;
    private readonly fetchUserByIdService;
    private readonly getAddressesByUserService;
    private readonly assignRolesInUserService;
    private readonly deleteUserService;
    private readonly apiResponseService;
    private readonly fetchUserInfoByIdService;
    private readonly updateUserInfoService;
    private readonly updatePhoneVerifiedService;
    private readonly updatePhoneService;
    private readonly uploadService;
    private readonly updateEmailService;
    private readonly fetchUserInfoByEmailService;
    private readonly fetchUserInfoByPhoneService;
    private readonly updateUserFreezeStatusService;
    constructor(listUsersService: ListUsersService, updateUsersService: UpdateUsersService, fetchUserByIdService: FetchUserByIdService, getAddressesByUserService: GetAddressesByUserService, assignRolesInUserService: AssignRolesInUserService, deleteUserService: DeleteUserService, apiResponseService: ApiResponseService, fetchUserInfoByIdService: FetchUserInfoByIdService, updateUserInfoService: UpdateUserInfoesService, updatePhoneVerifiedService: UpdatePhoneVerifiedService, updatePhoneService: UpdatePhoneService, uploadService: UploadService, updateEmailService: UpdateEmailService, fetchUserInfoByEmailService: FetchUserInfoByEmailService, fetchUserInfoByPhoneService: FetchUserInfoByPhoneService, updateUserFreezeStatusService: UpdateUserFreezeStatusService);
    getUsers(userType: string, res: Response): Promise<Response<ResponseModel>>;
    updateUser(id: number, userUpdateRequest: UserUpdateRequest, res: Response): Promise<Response<ResponseModel>>;
    unfreezeUser(id: number, res: Response): Promise<Response<ResponseModel>>;
    getUserById(id: number, res: Response): Promise<Response<ResponseModel>>;
    getUserInfoById(userId: any, res: Response): Promise<Response<ResponseModel>>;
    updateUserInfo(userId: any, userInfoUpdateRequest: UserInfoUpdateRequest, res: Response): Promise<Response<ResponseModel>>;
    VerifyPhoneNumber(userId: any, res: Response): Promise<Response<ResponseModel>>;
    UpdatePhoneNumber(userId: any, request: UpdatePhoneRequest, res: Response): Promise<Response<ResponseModel>>;
    UpdateEmail(userId: any, updateEmailRequest: UpdateEmailRequest, res: Response): Promise<Response<ResponseModel>>;
    getAddressByUser(id: number, res: Response): Promise<Response<ResponseModel>>;
    DeleteUser(id: number, res: Response): Promise<Response<ResponseModel>>;
    AssignPermission(id: number, userAssignRolesRequest: UserAssignRolesRequest, res: Response): Promise<Response<ResponseModel>>;
    upload(file: any, content: any, res: Response): Promise<Response<ResponseModel>>;
    getUserByEmail(userType: string, email: string, res: Response): Promise<Response<ResponseModel>>;
    getUserByPhone(userType: string, phone: string, res: Response): Promise<Response<ResponseModel>>;
}
