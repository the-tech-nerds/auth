import { Module } from '@nestjs/common';
import { AuthEventController } from './controllers/auth.event.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [AuthEventController],
})
export class AuthEventModule {}
