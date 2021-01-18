import { Injectable } from '@nestjs/common';
import { AuthorizationService } from '../authorization.service';
import { InitializeOauthServerService } from './initialize-oauth-server.service';

@Injectable()
export class TokenService extends AuthorizationService {
  constructor(
    private readonly initializeOauthServerService: InitializeOauthServerService,
  ) {
    super();
  }

  async execute() {
    const server = await this.initializeOauthServerService.initialize();
    return server.token();
  }
}
