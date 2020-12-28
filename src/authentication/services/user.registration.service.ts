import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User, UserType } from '../../user/entities/user.entity';
import { UserRegistrationRequest } from '../requests/user.registration.request';

export class UserRegistrationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(userData: UserRegistrationRequest) {
    const { password = '', type = UserType.USER } = userData;
    const {
      first_name: firstName,
      last_name: lastName,
      email,
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
    };
  }
}
