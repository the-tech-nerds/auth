import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { User } from '../../user/entities/user.entity';
import { UserResponse } from '../../user/response/user.response';
import { ResetPasswordRequest } from '../requests/reset-password.request';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(
    resetPasswordRequest: ResetPasswordRequest,
  ): Promise<UserResponse> {
    if (
      resetPasswordRequest.new_password !==
      resetPasswordRequest.new_password_confirm
    ) {
      throw new Error('Sorry! Password confirmation did not match');
    }

    const user = await this.userRepository.findOneOrFail(
      resetPasswordRequest.user_id,
    );

    const isPassMatching = await compare(
      resetPasswordRequest.old_password,
      user.password,
    );
    if (!isPassMatching) {
      throw new Error(
        'Sorry! Provided password did not match with your current password',
      );
    }

    user.password = await hash(resetPasswordRequest.new_password, 10);
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