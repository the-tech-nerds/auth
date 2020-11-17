import {
  Body, Controller, Delete, Get, Param, Post, Put, Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreatePermissionCategoryService } from '../services/permission-category/create-permision-category.service';
import { ListPermissionCategoryService } from '../services/permission-category/list-permission-category.service';
import { UpdatePermissionCategoryService } from '../services/permission-category/update-permission-category.service';
import { DeletePermissionCategoryService } from '../services/permission-category/delete-permission-category.service';
import { PermissionCategoryModel } from '../authorization';
import { PermissionCategories } from '../authorization.entity';
import { ApiResponseService } from '../../utils/services/api-response/response/api-response.service';

@Controller()
export class PermissionCategoryController {
  constructor(
    private readonly createPermissionCategoryService: CreatePermissionCategoryService,
    private readonly listPermissionCategoryService: ListPermissionCategoryService,
    private readonly updatePermissionCategoryService: UpdatePermissionCategoryService,
    private readonly deletePermissionCategoryService: DeletePermissionCategoryService,
    private readonly apiResponseService: ApiResponseService,
  ) {
  }

  @Post('/permission/category')
  async createPermissionCategory(@Body() permissionCategoryModel: PermissionCategoryModel, @Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.createPermissionCategoryService.create(permissionCategoryModel);
      return this.apiResponseService.successResponse(['Permission store successfully'], data as PermissionCategories, res);
    } catch (e) {
      return this.apiResponseService.internalServerError(['Something went wrong! please try again later'], res);
    }
  }

  @Get('/permission/categories')
  async getAllPermissionsCategory(@Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listPermissionCategoryService.getAll();
      return this.apiResponseService.successResponse(['Permission retrieved successfully'], data as PermissionCategories[], res);
    } catch (e) {
      return this.apiResponseService.internalServerError(['Something went wrong! please try again later'], res);
    }
  }

  @Put('/permission/category/:id')
  async updatePermissionCategory(@Param('id') id: number, @Body() permissionCategoryModel: PermissionCategoryModel, @Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.updatePermissionCategoryService.update(id, permissionCategoryModel);
      return this.apiResponseService.successResponse(['Permission update successfully'], data as PermissionCategories, res);
    } catch (e) {
      return this.apiResponseService.internalServerError(['Something went wrong! please try again later'], res);
    }
  }

  @Delete('/permission/category/:id')
  async deletePermissionCategory(@Param('id') id: number, @Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      await this.deletePermissionCategoryService.delete(id);
      return this.apiResponseService.successResponse(['Permission delete successfully'], null, res);
    } catch (e) {
      return this.apiResponseService.internalServerError(['Something went wrong! please try again later'], res);
    }
  }
}
