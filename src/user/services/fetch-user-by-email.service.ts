import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserResponse } from '../response/user.response';

@Injectable()
export class FetchUserInfoByEmailService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(email: string): Promise<UserResponse | undefined> {
    const userInfo = await this.usersRepository.findOne({
      email,
    });
    if (userInfo) {
      return {
        id: userInfo.id,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        phone: userInfo.phone,
        image_url: userInfo.image_url,
        birthday: userInfo.birthday,
        is_mobile_verified: userInfo.is_mobile_verified,
        gender_type: userInfo.gender_type,
      };
    }
    return undefined;
  }
}
