import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { AddressRequest } from '../requests/address.request';

@Injectable()
export class CreateAddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async create(addressRequest: AddressRequest): Promise<Address> {
    return this.addressRepository.save({
      ...addressRequest,
      created_by: 1,
    });
  }
}
