import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { User } from '../entities/user.entity';
import { UserInfoUpdateRequest } from '../requests/user-info-update.request';
import { FetchUserInfoByIdService } from './fetch-user-info-by-id.servec';
import { UserResponse } from '../response/user.response';

@Injectable()
export class UpdateUserInfoesService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private fetchUserInfoByIdService: FetchUserInfoByIdService,
  ) {}

  async execute(
    id: number,
    userInfoUpdateRequest: UserInfoUpdateRequest,
  ): Promise<UserResponse | undefined> {
    await this.usersRepository.update(id, {
      ...userInfoUpdateRequest,
      updated_by: id,
      updated_at: LocalDateToUtc(new Date()),
    });
    return this.fetchUserInfoByIdService.execute(id);
  }
}
