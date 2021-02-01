import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
export declare class ListAddressesService {
    private addressRepository;
    constructor(addressRepository: Repository<Address>);
    execute(): Promise<Address[]>;
}
