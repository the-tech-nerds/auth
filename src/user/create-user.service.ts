import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
// eslint-disable-next-line import/extensions
import { UserInput } from './user';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(userInput: UserInput): Promise<User> {
    return this.usersRepository.save(userInput);
  }
}
