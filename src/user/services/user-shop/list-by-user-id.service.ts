import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserShopMapping } from '../../entities/user-shop.entity';

@Injectable()
export class UserShopsService {
  constructor(
    @InjectRepository(UserShopMapping)
    private userShopsRepository: Repository<UserShopMapping>,
  ) {}

  async execute(userId: number): Promise<UserShopMapping[]> {
    return this.userShopsRepository.find({
      user_id: userId,
    });
  }
}
