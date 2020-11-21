import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';

@Injectable()
export class FetchAddressByIdService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async execute(addressId: number): Promise<Address | undefined> {
    return this.addressRepository.findOne({
      id: addressId,
    });
  }
}
