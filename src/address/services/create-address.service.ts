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

  async create(
    userId: number,
    addressRequest: AddressRequest,
  ): Promise<Address> {
    const address = await this.addressRepository.findOne({
      user_id: userId,
    });
    return this.addressRepository.save({
      ...addressRequest,
      user_id: userId,
      is_default: !address,
      created_by: userId,
    });
  }
}
