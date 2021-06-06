import { Controller, Get, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';
import { UserGuard, ApiResponseService } from '@the-tech-nerds/common-services';
import { ListDivisionService } from '../services/division/fetch-division.service';
import { Division } from '../entities/division.entity';

@Controller('division')
export class DivisionController {
  constructor(
    private readonly listDivisionService: ListDivisionService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @UseGuards(UserGuard)
  @Get('/all')
  async getAddresses(@Res() res: Response): Promise<Response<ResponseModel>> {
    const data = await this.listDivisionService.execute();
    return this.apiResponseService.successResponse(
      ['Division list fetched successfully'],
      data as Division[],
      res,
    );
  }
}
