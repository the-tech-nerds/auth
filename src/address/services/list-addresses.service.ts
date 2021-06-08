import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';

@Injectable()
export class ListAddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async execute(): Promise<Address[]> {
    return this.addressRepository.find({
      where: {
        deleted_at: null,
      },
      relations: ['city', 'area', 'division'],
    });
  }
}
