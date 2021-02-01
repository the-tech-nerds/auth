import { Response } from 'express';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { CreateRoleService } from '../services/role/create-role.service';
import { ListRoleService } from '../services/role/list-role.service';
import { GetByIdRoleService } from '../services/role/get-by-id-role.service';
import { DeleteRoleService } from '../services/role/delete-role.service';
import { UpdateRoleService } from '../services/role/update-role.service';
import { RoleRequest } from '../requests/role.request';
import { AssignPermissionInRoleService } from '../services/role/assign-permission-in-role.service';
import { RoleAssignPermissionRequest } from '../requests/role-assign-permission.request';
export declare class RoleController {
    private readonly createRoleService;
    private readonly listRoleService;
    private readonly getByIdRoleService;
    private readonly deleteRoleService;
    private readonly assignPermissionInRoleService;
    private readonly updateRoleService;
    private readonly apiResponseService;
    constructor(createRoleService: CreateRoleService, listRoleService: ListRoleService, getByIdRoleService: GetByIdRoleService, deleteRoleService: DeleteRoleService, assignPermissionInRoleService: AssignPermissionInRoleService, updateRoleService: UpdateRoleService, apiResponseService: ApiResponseService);
    createRole(roleRequest: RoleRequest, res: Response): Promise<Response<ResponseModel>>;
    getAllRoles(res: Response): Promise<Response<ResponseModel>>;
    getRolesById(id: number, res: Response): Promise<Response<ResponseModel>>;
    updateRole(id: number, roleRequest: RoleRequest, res: Response): Promise<Response<ResponseModel>>;
    changeRoleStatus(id: number, res: Response): Promise<Response<ResponseModel>>;
    DeleteRoles(id: number, res: Response): Promise<Response<ResponseModel>>;
    AssignPermission(id: number, roleAssignPermissionRequest: RoleAssignPermissionRequest, res: Response): Promise<Response<ResponseModel>>;
}
