import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/share/date-time-conversion/date-time-conversion';
import { User } from './user.entity';
// eslint-disable-next-line import/extensions
import { UserInput } from './user';

@Injectable()
export class UpdateUsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(id: number, userInput: UserInput): Promise<UserInput> {
    await this.usersRepository.update(id, {
      ...userInput,
      updatedBy: 1,
      updatedAt: LocalDateToUtc(new Date()),
    });
    return userInput;
  }
}
