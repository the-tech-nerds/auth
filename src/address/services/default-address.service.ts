import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Address } from '../entities/address.entity';

@Injectable()
export class DefaultAddressByUserIdService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async execute(userId: number): Promise<Address | undefined> {
    return this.addressRepository.findOne({
      where: {
        deleted_at: IsNull(),
        user_id: userId,
        is_default: true,
      },
      relations: ['city', 'area', 'division'],
    });
  }
}
