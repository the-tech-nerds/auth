import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
// eslint-disable-next-line import/extensions
import { UserRequest } from '../requests/user.request';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(userRequest: UserRequest): Promise<User> {
    return this.usersRepository.save(userRequest);
  }
}
