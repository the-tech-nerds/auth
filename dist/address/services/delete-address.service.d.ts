import { Repository, UpdateResult } from 'typeorm';
import { Address } from '../entities/address.entity';
export declare class DeleteAddressService {
    private addressRepository;
    constructor(addressRepository: Repository<Address>);
    execute(id: number): Promise<UpdateResult>;
}
