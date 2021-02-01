import { Response } from 'express';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { AddressRequest } from '../requests/address.request';
import { CreateAddressService } from '../services/create-address.service';
import { ListAddressesService } from '../services/list-addresses.service';
import { UpdateAddressService } from '../services/update-address.service';
import { FetchAddressByIdService } from '../services/fetch-address-by-id.service';
import { DeleteAddressService } from '../services/delete-address.service';
export declare class AddressController {
    private readonly createAddressService;
    private readonly listAddressesService;
    private readonly updateAddressService;
    private readonly fetchAddressByIdService;
    private readonly deleteAddressService;
    private readonly apiResponseService;
    constructor(createAddressService: CreateAddressService, listAddressesService: ListAddressesService, updateAddressService: UpdateAddressService, fetchAddressByIdService: FetchAddressByIdService, deleteAddressService: DeleteAddressService, apiResponseService: ApiResponseService);
    createAddress(userId: any, addressRequest: AddressRequest, res: Response): Promise<Response<ResponseModel>>;
    getAddresses(res: Response): Promise<Response<ResponseModel>>;
    updateAddress(userId: any, id: number, addressRequest: AddressRequest, res: Response): Promise<Response<ResponseModel>>;
    getAddressById(id: number, res: Response): Promise<Response<ResponseModel>>;
    DeleteAddress(id: number, res: Response): Promise<Response<ResponseModel>>;
}
