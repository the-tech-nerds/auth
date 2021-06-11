import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { Address } from '../entities/address.entity';

@Injectable()
export class MakeDefaultAddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async execute(id: number): Promise<Address | undefined> {
    const address = await this.addressRepository.findOne({
      is_default: true,
      deleted_at: IsNull(),
    });
    if (address) {
      await this.addressRepository.save({
        ...address,
        is_default: false,
        updated_at: LocalDateToUtc(new Date()),
      });
    }
    await this.addressRepository.update(id, {
      is_default: true,
      updated_at: LocalDateToUtc(new Date()),
    });
    return this.addressRepository.findOne(id);
  }
}
