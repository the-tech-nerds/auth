import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';

@Module({
  providers: [],
  controllers: [AuthorizationController]
})
export class AuthorizationModule {}
