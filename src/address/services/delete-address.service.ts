import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Address } from '../entities/address.entity';

@Injectable()
export class DeleteAddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async execute(id: number): Promise<UpdateResult> {
    return this.addressRepository.softDelete(id);
  }
}
