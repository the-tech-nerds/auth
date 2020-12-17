import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  HasPermissions,
  PermissionTypeEnum,
  PermissionTypes,
} from '@technerds/common-services';
import { CreatePermissionCategoryService } from '../services/permission-category/create-permision-category.service';
import { ListPermissionCategoryService } from '../services/permission-category/list-permission-category.service';
import { UpdatePermissionCategoryService } from '../services/permission-category/update-permission-category.service';
import { DeletePermissionCategoryService } from '../services/permission-category/delete-permission-category.service';
import { PermissionCategories } from '../entities/permission-category.entity';
import { ApiResponseService } from '../../utils/services/api-response/response/api-response.service';
import { PermissionCategoryRequest } from '../requests/permission-category.request';

@Controller('permission')
export class PermissionCategoryController {
  constructor(
    private readonly createPermissionCategoryService: CreatePermissionCategoryService,
    private readonly listPermissionCategoryService: ListPermissionCategoryService,
    private readonly updatePermissionCategoryService: UpdatePermissionCategoryService,
    private readonly deletePermissionCategoryService: DeletePermissionCategoryService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @HasPermissions(
    [PermissionTypes.PERMISSION_CATEGORY.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/category')
  async createPermissionCategory(
    @Body() permissionCategoryRequest: PermissionCategoryRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.createPermissionCategoryService.create(
        permissionCategoryRequest,
      );
      return this.apiResponseService.successResponse(
        ['Permission category store successfully'],
        data,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError(
        ['Something went wrong! please try again later'],
        res,
      );
    }
  }

  /* @HasPermissions(
    [PermissionTypes.PERMISSION_CATEGORY.GET],
    PermissionTypeEnum.hasPermission,
  ) */
  @Get('/categories')
  async getAllPermissionsCategory(
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listPermissionCategoryService.getAll();
      return this.apiResponseService.successResponse(
        ['Permission retrieved successfully'],
        data as PermissionCategories[],
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.message], res);
    }
  }

  /* @HasPermissions(
    [type.PERMISSION_CATEGORY.GET],
    PermissionTypeEnum.hasPermission,
  ) */
  @Get('/categories/role/:roleId')
  async getPermissionsCategoryFromRole(
    @Param('roleId') roleId: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listPermissionCategoryService.getFromRole(roleId);
      return this.apiResponseService.successResponse(
        ['Permission retrieved successfully'],
        data,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.message], res);
    }
  }

  @HasPermissions(
    [PermissionTypes.PERMISSION_CATEGORY.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/category/:id')
  async updatePermissionCategory(
    @Param('id') id: number,
    @Body() permissionCategoryRequest: PermissionCategoryRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.updatePermissionCategoryService.update(
        id,
        permissionCategoryRequest,
      );
      return this.apiResponseService.successResponse(
        ['Permission update successfully'],
        data as PermissionCategories,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError(
        ['Something went wrong! please try again later'],
        res,
      );
    }
  }

  @HasPermissions(
    [PermissionTypes.PERMISSION_CATEGORY.DELETE],
    PermissionTypeEnum.hasPermission,
  )
  @Delete('/category/:id')
  async deletePermissionCategory(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      await this.deletePermissionCategoryService.delete(id);
      return this.apiResponseService.successResponse(
        ['Permission delete successfully'],
        null,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError(
        ['Something went wrong! please try again later'],
        res,
      );
    }
  }
}
