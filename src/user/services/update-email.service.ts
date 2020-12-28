import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateEmailRequest } from '../requests/update-email.request';

@Injectable()
export class UpdateEmailService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(
    request: UpdateEmailRequest,
    user_id: number,
  ): Promise<boolean> {
    const user = await this.usersRepository.findOne(user_id);
    if (user) {
      if (user.email === request.email) {
        throw new Error(
          'This email has already account. Please login using this email',
        );
      }
      user.email = request.email;
      await this.usersRepository.save(user);
    } else {
      throw new Error('User not found');
    }
    return true;
  }
}
