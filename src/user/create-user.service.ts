import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }

  execute(userInput: UserInput): User {
    const {
      firstName = '',
      lastName = '',
    } = userInput;
    return this.usersRepository.create({
      firstName,
      lastName,
    });
  }
}
