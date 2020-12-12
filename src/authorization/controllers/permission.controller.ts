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
import { ApiResponseService } from 'src/utils/services/api-response/response/api-response.service';
import { Response } from 'express';
import { Permissions } from '../entities/permission.entity';
import { CreatePermissionService } from '../services/permission/create-permission.service';
import { DeletePermissionService } from '../services/permission/delete-permission.service';
import { ListPermissionService } from '../services/permission/list-permission.service';
import { UpdatePermissionService } from '../services/permission/update-permission.service';
import { GetByIdPermissionService } from '../services/permission/getById-permission.service';
import { PermissionRequest } from '../requests/permission.request';
import { HasPermissions } from '../guards/meta-data/permissions/permissions.decorator';
import { PermissionTypeEnum } from '../enum/permission-type.enum';
import * as type from '../utils/permission-types/permission.type';

@Controller()
export class PermissionController {
  constructor(
    private readonly createPermissionService: CreatePermissionService,
    private readonly listPermissionService: ListPermissionService,
    private readonly getByIdPermissionService: GetByIdPermissionService,
    private readonly deletePermissionService: DeletePermissionService,
    private readonly updatePermissionService: UpdatePermissionService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @HasPermissions([type.PERMISSION.CREATE], PermissionTypeEnum.hasPermission)
  @Post('/permission')
  async createPermission(
    @Body() permissionRequest: PermissionRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.createPermissionService.create(permissionRequest);
      return this.apiResponseService.successResponse(
        ['Permission category store successfully'],
        data as Permissions,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @HasPermissions([type.PERMISSION.GET], PermissionTypeEnum.hasPermission)
  @Get('/permissions')
  async getAllPermissions(
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listPermissionService.getAll();
      return this.apiResponseService.successResponse(
        ['List of permission'],
        data as Permissions[],
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError(
        ['Something went wrong! please try again later'],
        res,
      );
    }
  }

  @HasPermissions([type.PERMISSION.GET], PermissionTypeEnum.hasPermission)
  @Get('/permission/:id')
  async getPermissionsById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.getByIdPermissionService.getById(id);
      return this.apiResponseService.successResponse(
        ['Get permission successfully'],
        data as Permissions,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError(
        ['Something went wrong! please try again later'],
        res,
      );
    }
  }

  @HasPermissions([type.PERMISSION.GET], PermissionTypeEnum.hasPermission)
  @Get('/role/:roleId/permissons')
  async getPermissionsCategoryFromRole(
    @Param('roleId') roleId: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listPermissionService.getFromRole(roleId);
      return this.apiResponseService.successResponse(
        ['Role Permission retrieved successfully'],
        data,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.message], res);
    }
  }

  @HasPermissions([type.PERMISSION.UPDATE], PermissionTypeEnum.hasPermission)
  @Put('/permission/:id')
  async updatePermission(
    @Param('id') id: number,
    @Body() permissionRequest: PermissionRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.updatePermissionService.update(
        id,
        permissionRequest,
      );
      return this.apiResponseService.successResponse(
        ['Permission category updated successfully'],
        data as Permissions,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError(
        ['Something went wrong! please try again later'],
        res,
      );
    }
  }

  @HasPermissions([type.PERMISSION.DELETE], PermissionTypeEnum.hasPermission)
  @Delete('/permission/:id')
  async DeletePermissions(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.deletePermissionService.delete(id);
      return this.apiResponseService.successResponse(
        ['Permission category deleted successfully'],
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
}
