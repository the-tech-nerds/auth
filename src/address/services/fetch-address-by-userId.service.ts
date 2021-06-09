import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';

@Injectable()
export class ListAddressesByUserIdService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async execute(userId: number): Promise<Address[]> {
    return this.addressRepository.find({
      where: {
        deleted_at: null,
        user_id: userId,
      },
      relations: ['city', 'area', 'division'],
    });
  }
}
