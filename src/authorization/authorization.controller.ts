import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { PermissionCategoryModel, PermissionsModel } from './authorization';
import { PermissionCategories, Permissions } from './authorization.entity';
import { CreatePermissionCategoryService } from './services/permission/create-permision-category.service';
import { CreatePermissionService } from './services/permission/create-permission.service';
import { DeletePermissionCategoryService } from './services/permission/delete-permission-category.service';
import { DeletePermissionService } from './services/permission/delete-permission.service';
import { GetByIdPermissionCategoryService } from './services/permission/getById-permission-category.service';
import { GetByIdPermissionService } from './services/permission/getById-permission.service';
import { ListPermissionCategoryService } from './services/permission/list-permission-category.service';
import { ListPermissionService } from './services/permission/list-permission.service';
import { UpdatePermissionCategoryService } from './services/permission/update-permission-category.service';
import { UpdatePermissionService } from './services/permission/update-permission.service';

@Controller('authorization')
export class AuthorizationController {
  constructor(
    private readonly createPermissionCategoryService: CreatePermissionCategoryService,
    private readonly listPermissionCategoryService: ListPermissionCategoryService,
    private readonly updatePermissionCategoryService: UpdatePermissionCategoryService,
    private readonly getByIdPermissionCategoryService: GetByIdPermissionCategoryService,
    private readonly deletePermissionCategoryService: DeletePermissionCategoryService,
    private readonly createPermissionService: CreatePermissionService,
    private readonly listPermissionService: ListPermissionService,
    private readonly getByIdPermissionService: GetByIdPermissionService,
    private readonly deletePermissionService: DeletePermissionService,
    private readonly updatePermissionService: UpdatePermissionService
  ) {}

  // permission category
  @Post('/permission/category')
  createPermissionCategory(@Body() permissionCategoryModel: PermissionCategoryModel): Promise<PermissionCategories> {
    return this.createPermissionCategoryService.create(permissionCategoryModel);
  }

  @Get('/permission/categories')
  getAllPermissionsCategory(): Promise<PermissionCategories[]> {
    return this.listPermissionCategoryService.getAll();
  }

  @Get('/permission/categories/:id')
  getPermissionsCategoryById(@Param('id') id : number): Promise<PermissionCategories | undefined> {
    return this.getByIdPermissionCategoryService.getById(id);
  }

  @Put('/permission/category/:id')
  updatePermissionCategory(@Param('id') id : number, @Body() permissionCategoryModel: PermissionCategoryModel) : Promise<PermissionCategoryModel>  {
     const res = this.updatePermissionCategoryService.update(id, permissionCategoryModel);
     return res;
  }

  @Delete('/permission/categories/:id')
  DeletePermissionsCategory(@Param('id') id : number): Promise<UpdateResult> {
    return this.deletePermissionCategoryService.delete(id);
  }

  // permission
  @Post('/permission')
  createPermission(@Body() permissionModel: PermissionsModel): Promise<Permissions> {
    return this.createPermissionService.create(permissionModel);
  }
  @Get('/permission')
  getAllPermissions(): Promise<Permissions[]> {
    return this.listPermissionService.getAll();
  }

  @Get('/permission/:id')
  getPermissionsById(@Param('id') id : number): Promise<Permissions | undefined> {
    return this.getByIdPermissionService.getById(id);
  }

  @Put('/permission/:id')
  updatePermission(@Param('id') id : number, @Body() permissionModel: PermissionsModel) : Promise<PermissionsModel>  {
     return this.updatePermissionService.update(id, permissionModel);
  }

  @Delete('/permission/:id')
  DeletePermissions(@Param('id') id : number): Promise<UpdateResult> {
    return this.deletePermissionService.delete(id);
  }
}
