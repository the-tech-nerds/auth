import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserResponse } from '../response/user.response';

@Injectable()
export class FetchUserInfoByIdService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(userId: number): Promise<UserResponse | undefined> {
    const userInfo = await this.usersRepository.findOne(userId);
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
        is_facebook_login: !!userInfo.facebook_user_id,
        has_password: userInfo.password.length > 5,
        is_gmail_login: !!userInfo.google_auth,
        gender_type: userInfo.gender_type,
      };
    }
    return undefined;
  }
}
