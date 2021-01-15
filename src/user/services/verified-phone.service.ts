import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UpdatePhoneVerifiedService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(id: number): Promise<boolean> {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      user.is_mobile_verified = true;
      await this.usersRepository.save(user);
    } else {
      throw new BadRequestException('User not found');
    }
    return true;
  }
}
