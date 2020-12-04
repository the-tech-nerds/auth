import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';

@Injectable()
export class FetchAddressByUserIdService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async execute(userId: number): Promise<Address[] | undefined> {
    return this.addressRepository.find({
      user_id: userId,
    });
  }
}
