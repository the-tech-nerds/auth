import { Controller, Get, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';
import { UserGuard, ApiResponseService } from '@the-tech-nerds/common-services';
import { ListAreaService } from '../services/area/area.service';

@Controller('area')
export class AreaController {
  constructor(
    private readonly listAreaService: ListAreaService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @UseGuards(UserGuard)
  @Get('/all')
  async get(@Res() res: Response): Promise<Response<ResponseModel>> {
    const data = await this.listAreaService.execute();
    return this.apiResponseService.successResponse(
      ['Area list fetched successfully'],
      data,
      res,
    );
  }
}
