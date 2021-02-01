import { Response } from 'express';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { CreatePermissionCategoryService } from '../services/permission-category/create-permision-category.service';
import { ListPermissionCategoryService } from '../services/permission-category/list-permission-category.service';
import { UpdatePermissionCategoryService } from '../services/permission-category/update-permission-category.service';
import { DeletePermissionCategoryService } from '../services/permission-category/delete-permission-category.service';
import { PermissionCategoryRequest } from '../requests/permission-category.request';
export declare class PermissionCategoryController {
    private readonly createPermissionCategoryService;
    private readonly listPermissionCategoryService;
    private readonly updatePermissionCategoryService;
    private readonly deletePermissionCategoryService;
    private readonly apiResponseService;
    constructor(createPermissionCategoryService: CreatePermissionCategoryService, listPermissionCategoryService: ListPermissionCategoryService, updatePermissionCategoryService: UpdatePermissionCategoryService, deletePermissionCategoryService: DeletePermissionCategoryService, apiResponseService: ApiResponseService);
    createPermissionCategory(permissionCategoryRequest: PermissionCategoryRequest, res: Response): Promise<Response<ResponseModel>>;
    getAllPermissionsCategory(res: Response): Promise<Response<ResponseModel>>;
    getPermissionsCategoryFromRole(roleId: number, res: Response): Promise<Response<ResponseModel>>;
    updatePermissionCategory(id: number, permissionCategoryRequest: PermissionCategoryRequest, res: Response): Promise<Response<ResponseModel>>;
    deletePermissionCategory(id: number, res: Response): Promise<Response<ResponseModel>>;
}
