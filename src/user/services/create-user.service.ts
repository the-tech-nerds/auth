import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
<<<<<<< HEAD:src/user/services/create-user.service.ts
import { User } from '../user.entity';
import {UserInput} from '../user';
=======
import { User } from './user.entity';
// eslint-disable-next-line import/extensions
import { UserInput } from './user';
>>>>>>> f564028bdeeec1d9c618951a28e302a201d7a510:src/user/create-user.service.ts

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
