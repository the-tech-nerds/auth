import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/address/entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListCityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async execute(): Promise<City[] | undefined> {
    return this.cityRepository.find();
  }
}
