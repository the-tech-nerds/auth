import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
@Injectable()
export class FetchUserInfoByEmailService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(email: string, type: number): Promise<Boolean | undefined> {
    const userInfo = await this.usersRepository.findOne({
      email,
      type,
    });
    if (userInfo) {
      return true;
    }
    return undefined;
  }
}
