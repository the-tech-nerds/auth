import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserShopMapping } from '../../entities/user-shop.entity';
import { UserShopsService } from './list-by-user-id.service';

@Injectable()
export class UpdateUserShopsService {
  constructor(
    @InjectRepository(UserShopMapping)
    private userShopsRepository: Repository<UserShopMapping>,
    private userShopsService: UserShopsService,
  ) {}

  async execute(userId: number, shopIds: number[]): Promise<boolean> {
    const shops = await this.userShopsService.execute(userId);
    const deletedShops = shops.filter(s => !shopIds.includes(s.shop_id));
    const newShops = shopIds
      .filter(i => !shops.map(s => s.shop_id).includes(i))
      .map(mp => ({
        user_id: userId,
        shop_id: mp,
      }));
    await this.userShopsRepository.remove(deletedShops);
    await this.userShopsRepository.save(newShops);
    return true;
  }
}
