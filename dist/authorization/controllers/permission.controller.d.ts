import { Response } from 'express';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { CreatePermissionService } from '../services/permission/create-permission.service';
import { DeletePermissionService } from '../services/permission/delete-permission.service';
import { ListPermissionService } from '../services/permission/list-permission.service';
import { UpdatePermissionService } from '../services/permission/update-permission.service';
import { GetByIdPermissionService } from '../services/permission/getById-permission.service';
import { PermissionRequest } from '../requests/permission.request';
export declare class PermissionController {
    private readonly createPermissionService;
    private readonly listPermissionService;
    private readonly getByIdPermissionService;
    private readonly deletePermissionService;
    private readonly updatePermissionService;
    private readonly apiResponseService;
    constructor(createPermissionService: CreatePermissionService, listPermissionService: ListPermissionService, getByIdPermissionService: GetByIdPermissionService, deletePermissionService: DeletePermissionService, updatePermissionService: UpdatePermissionService, apiResponseService: ApiResponseService);
    createPermission(permissionRequest: PermissionRequest, res: Response): Promise<Response<ResponseModel>>;
    getAllPermissions(res: Response): Promise<Response<ResponseModel>>;
    getPermissionsFromRole(roleId: number, res: Response): Promise<Response<ResponseModel>>;
    getPermissionsById(id: number, res: Response): Promise<Response<ResponseModel>>;
    updatePermission(id: number, permissionRequest: PermissionRequest, res: Response): Promise<Response<ResponseModel>>;
    DeletePermissions(id: number, res: Response): Promise<Response<ResponseModel>>;
}
