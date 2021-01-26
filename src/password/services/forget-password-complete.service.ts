import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { ForgetPasswordCompleteRequest } from '../requests/forget-password-complete.request';
import { User } from '../../user/entities/user.entity';
import { UserResponse } from '../../user/response/user.response';

@Injectable()
export class ForgetPasswordCompleteService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(
    forgetPasswordRequest: ForgetPasswordCompleteRequest,
    type: number,
  ): Promise<UserResponse> {
    if (forgetPasswordRequest.phone && forgetPasswordRequest.email) {
      throw new BadRequestException('need only email or only password.');
    }
    const user = await this.userRepository.findOneOrFail({
      where: [
        { email: forgetPasswordRequest.phone },
        { phone: forgetPasswordRequest.email },
        {
          type,
        },
      ],
    });

    if (!user) {
      throw new BadRequestException('user not found');
    }
    user.password = await hash(forgetPasswordRequest.password, 10);
    await this.userRepository.save(user);

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      image_url: user.image_url,
      birthday: user.birthday,
      is_mobile_verified: user.is_mobile_verified,
      gender_type: user.gender_type,
    };
  }
}
