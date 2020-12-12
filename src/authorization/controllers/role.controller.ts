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
import { CreateRoleService } from '../services/role/create-role.service';
import { ListRoleService } from '../services/role/list-role.service';
import { GetByIdRoleService } from '../services/role/get-by-id-role.service';
import { DeleteRoleService } from '../services/role/delete-role.service';
import { UpdateRoleService } from '../services/role/update-role.service';
import { ApiResponseService } from '../../utils/services/api-response/response/api-response.service';
import { RoleRequest } from '../requests/role.request';
import { Roles } from '../entities/role.entity';
import { AssignPermissionInRoleService } from '../services/role/assign-permission-in-role.service';
import { RoleAssignPermissionRequest } from '../requests/role-assign-permission.request';

@Controller()
export class RoleController {
  constructor(
    private readonly createRoleService: CreateRoleService,
    private readonly listRoleService: ListRoleService,
    private readonly getByIdRoleService: GetByIdRoleService,
    private readonly deleteRoleService: DeleteRoleService,
    private readonly assignPermissionInRoleService: AssignPermissionInRoleService,
    private readonly updateRoleService: UpdateRoleService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @HasPermissions(
    [PermissionTypes.ROLE.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/role')
  async createRole(
    @Body() roleRequest: RoleRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.createRoleService.create(roleRequest);
      return this.apiResponseService.successResponse(
        ['Role category store successfully'],
        data as Roles,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @HasPermissions([PermissionTypes.ROLE.GET], PermissionTypeEnum.hasPermission)
  @Get('/roles')
  async getAllRoles(@Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listRoleService.getAll();
      return this.apiResponseService.successResponse(
        ['List of role'],
        data as Roles[],
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
    [PermissionTypes.ROLE.CREATE],
    PermissionTypeEnum.hasPermission,
  )
  @Get('/role/:id')
  async getRolesById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.getByIdRoleService.getById(id);
      return this.apiResponseService.successResponse(
        ['Get role successfully'],
        data as Roles,
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
    [PermissionTypes.ROLE.UPDATE],
    PermissionTypeEnum.hasPermission,
  )
  @Put('/role/:id')
  async updateRole(
    @Param('id') id: number,
    @Body() roleRequest: RoleRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.updateRoleService.update(id, roleRequest);
      return this.apiResponseService.successResponse(
        ['Role category updated successfully'],
        data as Roles,
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
    [PermissionTypes.ROLE.DELETE],
    PermissionTypeEnum.hasPermission,
  )
  @Delete('/role/:id')
  async DeleteRoles(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.deleteRoleService.delete(id);
      return this.apiResponseService.successResponse(
        ['Role category deleted successfully'],
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

  @HasPermissions(
    [PermissionTypes.ROLE.PERMISSION_ASSIGN],
    PermissionTypeEnum.hasPermission,
  )
  @Post('/role/:id/assign-permissions')
  async AssignPermission(
    @Param('id') id: number,
    @Body() roleAssignPermissionRequest: RoleAssignPermissionRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.assignPermissionInRoleService.assign(
        id,
        roleAssignPermissionRequest.permissions,
      );
      return this.apiResponseService.successResponse(
        ['Role Assign successfully'],
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
