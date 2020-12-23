import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdatePhoneRequest } from '../requests/update-phone.request';

@Injectable()
export class UpdatePhoneService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(request: UpdatePhoneRequest): Promise<boolean> {
    const user = await this.usersRepository.findOne(request.user_id);
    if (user) {
      user.phone = request.phone;
      await this.usersRepository.save(user);
    } else {
      throw new Error('User not found');
    }
    return true;
  }
}