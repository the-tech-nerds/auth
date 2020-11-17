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
