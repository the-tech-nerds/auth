import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginHistoryRequest } from '../requests/login-history.request';
import { LoginHistories } from '../entities/login-history.entity';

@Injectable()
export class InsertLoginHistoryService {
  constructor(
    @InjectRepository(LoginHistories)
    private loginHistoriesRepository: Repository<LoginHistories>,
  ) {}

  execute(loginHistoryRequest: LoginHistoryRequest): void {
    const isEmail = loginHistoryRequest.userName.includes('@');

    const loginHistoryData = {
      phone: isEmail ? null : loginHistoryRequest.userName,
      email: isEmail ? loginHistoryRequest.userName : null,
      request_source: loginHistoryRequest.request_source,
      status: loginHistoryRequest.status,
    };
    // @ts-ignore
    const data = this.loginHistoriesRepository.save({
      ...loginHistoryData,
      created_by: 1,
    });
  }
}
