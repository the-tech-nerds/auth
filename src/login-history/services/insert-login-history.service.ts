/*
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginHistoryRequest } from '../requests/login-history.request';
import { LoginHistories } from '../entities/login-history.entity';

@Injectable()
export class InsertLoginHistoryService {
  constructor(
    @InjectRepository(LoginHistories)
    private loginHistoriesRepository: Repository<LoginHistories>
  ) {}

  execute(loginHistoryRequest: LoginHistoryRequest): void {
    this.loginHistoriesRepository.save({
      ...loginHistoryRequest,
      created_by: 1,
    });
  }
}
*/
