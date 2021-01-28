import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { LoginHistories } from './entities/login-history.entity';
import { InsertLoginHistoryService } from './services/insert-login-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoginHistories])],
  providers: [InsertLoginHistoryService, ApiResponseService],
  controllers: [],
  exports: [InsertLoginHistoryService],
})
export class LoginHistoryModule {}
