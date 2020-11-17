import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { User } from '../entities/user.entity';
import { UserRequest } from '../requests/user.request';
import { FetchUserByIdService } from './fetch-user-by-id.service';

@Injectable()
export class UpdateUsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private fetchUserByIdService: FetchUserByIdService,
  ) {}

  async execute(
    id: number,
    userRequest: UserRequest,
  ): Promise<User | undefined> {
    await this.usersRepository.update(id, {
      ...userRequest,
      updatedBy: 1,
      updatedAt: LocalDateToUtc(new Date()),
    });
    return this.fetchUserByIdService.execute(id);
  }
}
