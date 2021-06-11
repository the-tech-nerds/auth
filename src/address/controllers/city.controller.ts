import { Controller, Get, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';
import { UserGuard, ApiResponseService } from '@the-tech-nerds/common-services';
import { ListCityService } from '../services/city/fetch-cities.service';

@Controller('city')
export class CityController {
  constructor(
    private readonly listCityService: ListCityService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @UseGuards(UserGuard)
  @Get('/all')
  async get(@Res() res: Response): Promise<Response<ResponseModel>> {
    const data = await this.listCityService.execute();
    return this.apiResponseService.successResponse(
      ['City list fetched successfully'],
      data,
      res,
    );
  }
}
