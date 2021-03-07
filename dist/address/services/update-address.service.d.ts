import { Repository } from 'typeorm';
import { AddressRequest } from '../requests/address.request';
import { Address } from '../entities/address.entity';
export declare class UpdateAddressService {
    private addressRepository;
    constructor(addressRepository: Repository<Address>);
    execute(id: number, addressRequest: AddressRequest): Promise<Address | undefined>;
}
