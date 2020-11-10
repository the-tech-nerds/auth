import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionCategoryModel } from './authorization';
import { PermissionCategories } from './authorization.entity';
import { CreatePermissionCategoryService } from './services/permission/create-permision-category.service';
import { ListPermissionCategoryService } from './services/permission/list-permission-category.service';
import { UpdatePermissionCategoryService } from './services/permission/update-permission-category.service';

@Controller('authorization')
export class AuthorizationController {
  constructor(
    private readonly createPermissionCategoryService: CreatePermissionCategoryService,
    private readonly listPermissionCategoryService: ListPermissionCategoryService,
    private readonly updatePermissionCategoryService: UpdatePermissionCategoryService
  ) {}

  @Post('/permission/category')
  createPermissionCategory(@Body() permissionCategoryModel: PermissionCategoryModel): Promise<PermissionCategories> {
    return this.createPermissionCategoryService.create(permissionCategoryModel);
  }

  @Get('/permission/categories')
  getAllPermissionsCategory(): Promise<PermissionCategories[]> {
    return this.listPermissionCategoryService.getAll();
  }
  @Put('/permission/category/:id')
  updatePermissionCategory(@Param('id') id : number, @Body() permissionCategoryModel: PermissionCategoryModel) : Promise<PermissionCategoryModel>  {
     const res = this.updatePermissionCategoryService.update(id, permissionCategoryModel);
     return res;
  }
}
