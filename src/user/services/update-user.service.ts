import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { User } from '../entities/user.entity';
// eslint-disable-next-line import/extensions
import { UserRequest } from '../requests/user.request';

@Injectable()
export class UpdateUsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(id: number, userRequest: UserRequest): Promise<UserRequest> {
    await this.usersRepository.update(id, {
      ...userRequest,
      updated_by: 1,
      updated_at: LocalDateToUtc(new Date()),
    });
    return userRequest;
  }
}
