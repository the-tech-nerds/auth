import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
// eslint-disable-next-line import/extensions
import { AddressRequest } from '../requests/address.request';
import { Address } from '../entities/address.entity';

@Injectable()
export class UpdateAddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async execute(
    id: number,
    addressRequest: AddressRequest,
  ): Promise<Address | undefined> {
    await this.addressRepository.update(id, {
      ...addressRequest,
      updated_by: 1,
      updated_at: LocalDateToUtc(new Date()),
    });
    return this.addressRepository.findOne(id);
  }
}
