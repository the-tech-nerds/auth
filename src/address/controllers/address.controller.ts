import {
  Body,
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';

import { ApiResponseService } from 'src/utils/services/api-response/response/api-response.service';
import { Response } from 'express';
import { CurrentUser, UserGuard } from '@technerds/common-services';
import { Address } from '../entities/address.entity';
import { AddressRequest } from '../requests/address.request';

import { CreateAddressService } from '../services/create-address.service';
import { ListAddressesService } from '../services/list-addresses.service';
import { UpdateAddressService } from '../services/update-address.service';
import { FetchAddressByIdService } from '../services/fetch-address-by-id.service';
import { DeleteAddressService } from '../services/delete-address.service';

@Controller()
export class AddressController {
  constructor(
    private readonly createAddressService: CreateAddressService,
    private readonly listAddressesService: ListAddressesService,
    private readonly updateAddressService: UpdateAddressService,
    private readonly fetchAddressByIdService: FetchAddressByIdService,
    private readonly deleteAddressService: DeleteAddressService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @UseGuards(UserGuard)
  @Post('/')
  async createAddress(
    @CurrentUser('id') userId: any,
    @Body() addressRequest: AddressRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      addressRequest.user_id = userId;
      const data = await this.createAddressService.create(addressRequest);
      return this.apiResponseService.successResponse(
        ['Address stored successfully'],
        data as Address,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @UseGuards(UserGuard)
  @Get('/all')
  async getAddresses(@Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listAddressesService.execute();
      return this.apiResponseService.successResponse(
        ['Address list fetched successfully'],
        data as Address[],
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @UseGuards(UserGuard)
  @Put('/:id')
  async updateAddress(
    @CurrentUser('id') userId: any,
    @Param('id') id: number,
    @Body() addressRequest: AddressRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      addressRequest.user_id = userId;
      const data = await this.updateAddressService.execute(id, addressRequest);
      return this.apiResponseService.successResponse(
        ['Address has been updated successfully'],
        data as Address,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @Get('/:id')
  async getAddressById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.fetchAddressByIdService.execute(id);
      return this.apiResponseService.successResponse(
        ['Address fetched successfully'],
        data as Address,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }

  @Delete('/:id')
  async DeleteAddress(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const data = await this.deleteAddressService.execute(id);
      return this.apiResponseService.successResponse(
        ['Address has been deleted successfully'],
        data,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }
}
