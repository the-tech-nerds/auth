import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class ListUsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(userType: string): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        type: Number(userType),
        email: Not(Equal('admin@khanfcbd.com')),
      },
      relations: ['roles'],
    });
  }
}
