import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreatePermissionCategoryService } from '../services/permission-category/create-permision-category.service';
import { ListPermissionCategoryService } from '../services/permission-category/list-permission-category.service';
import { UpdatePermissionCategoryService } from '../services/permission-category/update-permission-category.service';
import { DeletePermissionCategoryService } from '../services/permission-category/delete-permission-category.service';
import { PermissionCategoryModel } from '../authorization';
import { PermissionCategories } from '../authorization.entity';
import { AuthorizationController } from '../authorization.controller';


@Controller()
export class PermissionCategoryController extends AuthorizationController {
  constructor(
    private readonly createPermissionCategoryService: CreatePermissionCategoryService,
    private readonly listPermissionCategoryService: ListPermissionCategoryService,
    private readonly updatePermissionCategoryService: UpdatePermissionCategoryService,
    private readonly deletePermissionCategoryService: DeletePermissionCategoryService,
  ) {
    super();
  }

  @Post('/permission/category')
  async createPermissionCategory(@Body() permissionCategoryModel: PermissionCategoryModel, @Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.createPermissionCategoryService.create(permissionCategoryModel);
      return this.response(['Permission category store successfully'], 'success', 200, data as PermissionCategories, res);
    } catch (e) {
      return this.response(['Something went wrong! please try again later'], 'fail', 500, null, res);
    }
  }

  @Get('/permission/categories')
  async getAllPermissionsCategory(@Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listPermissionCategoryService.getAll();
      return this.response(['Permission category retrieved successfully'], 'success', 200, data as PermissionCategories[], res);
    } catch (e) {
      return this.response(['Something went wrong! please try again later'], 'fail', 500, null, res);
    }
  }

  @Put('/permission/category/:id')
  async updatePermissionCategory(@Param('id') id: number, @Body() permissionCategoryModel: PermissionCategoryModel, @Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.updatePermissionCategoryService.update(id, permissionCategoryModel);
      permissionCategoryModel.updatedBy = 1;
      return this.response(['Permission category update successfully'], 'success', 200, data as PermissionCategoryModel, res);
    } catch (e) {
      return this.response(['Something went wrong! please try again later'], 'fail', 500, null, res);
    }
  }

  @Delete('/permission/category/:id')
  async deletePermissionCategory(@Param('id') id: number, @Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.deletePermissionCategoryService.delete(id);
      return this.response(['Permission category delete successfully'], 'success', 200, data, res);
    } catch (e) {
      return this.response(['Something went wrong! please try again later'], 'fail', 500, null, res);
    }
  }
}
