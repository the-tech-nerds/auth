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

import { Response } from 'express';
import {
  CurrentUser,
  UserGuard,
  ApiResponseService,
} from '@the-tech-nerds/common-services';
import { Address } from '../entities/address.entity';
import { AddressRequest } from '../requests/address.request';

import { CreateAddressService } from '../services/create-address.service';
import { ListAddressesService } from '../services/list-addresses.service';
import { UpdateAddressService } from '../services/update-address.service';
import { FetchAddressByIdService } from '../services/fetch-address-by-id.service';
import { DeleteAddressService } from '../services/delete-address.service';
import { ListAddressesByUserIdService } from '../services/fetch-address-by-userId.service';
import { MakeDefaultAddressService } from '../services/make-default.service';
import { DefaultAddressByUserIdService } from '../services/default-address.service';

@Controller()
export class AddressController {
  constructor(
    private readonly createAddressService: CreateAddressService,
    private readonly listAddressesService: ListAddressesService,
    private readonly updateAddressService: UpdateAddressService,
    private readonly fetchAddressByIdService: FetchAddressByIdService,
    private readonly deleteAddressService: DeleteAddressService,
    private readonly apiResponseService: ApiResponseService,
    private readonly fetchUserAddress: ListAddressesByUserIdService,
    private readonly makeDefaultAddress: MakeDefaultAddressService,
    private readonly defaultAddressByUser: DefaultAddressByUserIdService,
  ) {}

  @UseGuards(UserGuard)
  @Post('/')
  async createAddress(
    @CurrentUser('id') userId: any,
    @Body() addressRequest: AddressRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.createAddressService.create(userId, addressRequest);
    return this.apiResponseService.successResponse(
      ['Address stored successfully'],
      data as Address,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Get('/all')
  async getAddresses(@Res() res: Response): Promise<Response<ResponseModel>> {
    const data = await this.listAddressesService.execute();
    return this.apiResponseService.successResponse(
      ['Address list fetched successfully'],
      data as Address[],
      res,
    );
  }

  @UseGuards(UserGuard)
  @Put('/:id')
  async updateAddress(
    @CurrentUser('id') userId: any,
    @Param('id') id: number,
    @Body() addressRequest: AddressRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.updateAddressService.execute(
      id,
      userId,
      addressRequest,
    );
    return this.apiResponseService.successResponse(
      ['Address has been updated successfully'],
      data as Address,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Get('/:id')
  async getAddressById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchAddressByIdService.execute(id);
    return this.apiResponseService.successResponse(
      ['Address fetched successfully'],
      data as Address,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Get('/user/all')
  async getAddressByUserId(
    @CurrentUser('id') userId: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fetchUserAddress.execute(userId);
    return this.apiResponseService.successResponse(
      ['Address fetched successfully'],
      data as Address[],
      res,
    );
  }

  @UseGuards(UserGuard)
  @Put('/default/:id')
  async udateDefaultAddress(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.makeDefaultAddress.execute(id);
    return this.apiResponseService.successResponse(
      ['Update default address'],
      data as Address,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Get('/user/default')
  async getDefaultAddress(
    @CurrentUser('id') userId: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.defaultAddressByUser.execute(userId);
    return this.apiResponseService.successResponse(
      ['fetch default address'],
      data as Address,
      res,
    );
  }

  @UseGuards(UserGuard)
  @Delete('/:id')
  async DeleteAddress(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.deleteAddressService.execute(id);
    return this.apiResponseService.successResponse(
      ['Address has been deleted successfully'],
      data,
      res,
    );
  }
}
