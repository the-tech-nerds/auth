import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';
import { User, UserType } from '../../user/entities/user.entity';
import { UserRegistrationRequest } from '../requests/user.registration.request';

export class UserRegistrationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(userData: UserRegistrationRequest) {
    const { password = '', type = UserType.USER } = userData;
    let user = null;
    if (userData.email) {
      user = await this.userRepository.findOne({
        email: userData.email,
        type,
      });
    }
    if (userData.phone) {
      user = await this.userRepository.findOne({
        phone: userData.phone,
        type,
      });
    }
    if (user) {
      throw new BadRequestException(
        'Account already exist for this email or phone number.',
      );
    }
    const {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      image_url: imageUrl,
      id,
    } = await this.userRepository.save({
      ...userData,
      type,
      password: password.length > 4 ? await hash(password, 10) : password,
      created_by: 1,
    });
    return {
      first_name: firstName,
      last_name: lastName,
      email,
      image_url: imageUrl,
      id,
      phone,
    };
  }
}
