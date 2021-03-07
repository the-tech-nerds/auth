import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { AddressRequest } from '../requests/address.request';
export declare class CreateAddressService {
    private addressRepository;
    constructor(addressRepository: Repository<Address>);
    create(addressRequest: AddressRequest): Promise<Address>;
}
