import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
export declare class FetchAddressByIdService {
    private addressRepository;
    constructor(addressRepository: Repository<Address>);
    execute(addressId: number): Promise<Address | undefined>;
}
