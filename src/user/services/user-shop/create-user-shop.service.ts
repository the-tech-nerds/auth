import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserShopMapping } from 'src/user/entities/user-shop.entity';

@Injectable()
export class CreateUserShopService {
  constructor(
    @InjectRepository(UserShopMapping)
    private userShopRepository: Repository<UserShopMapping>,
  ) {}

  async execute(userId: number, shop_id?: number[]): Promise<Boolean> {
    const userShops: any = [];
    shop_id?.forEach(element => {
      userShops.push({
        user_id: userId,
        shop_id: Number(element),
      });
    });
    await this.userShopRepository.save(userShops);

    return true;
  }
}
