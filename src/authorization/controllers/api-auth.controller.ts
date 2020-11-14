import {
  Body, Controller, Delete, Get, Param, Post, Put, Res,
} from '@nestjs/common';
import { Permissions } from 'src/authorization/authorization.entity';
import { ApiResponseService } from 'src/share/services/api-response/response/api-response.service';
import { Response } from 'express';
import { CacheService } from '@technerds/common-services/src/cache/cache.service';
import { PermissionModel } from '../authorization';

@Controller()
export class PermissionController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Get('/client-token')
  async createPermission(@Body() permissionModel: PermissionModel,
    @Res() res: Response): Promise<Response<ResponseModel>> {
    const token = await this.cacheService.set('token', '123456');
    return this.apiResponseService.successResponse(
      ['Client token successfully set'],
      token,
      res,
    );
  }
}
