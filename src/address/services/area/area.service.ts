import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from 'src/address/entities/area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListAreaService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ) {}

  async execute(): Promise<Area[] | undefined> {
    return this.areaRepository.find();
  }
}
