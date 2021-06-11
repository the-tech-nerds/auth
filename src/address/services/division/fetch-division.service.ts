import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Division } from 'src/address/entities/division.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListDivisionService {
  constructor(
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>,
  ) {}

  async execute(): Promise<Division[] | undefined> {
    return this.divisionRepository.find();
  }
}
