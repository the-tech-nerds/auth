import { Injectable } from '@nestjs/common';
import { AuthorizationService } from '../authorization.service';
import { SerializeClientService } from './serialize-client.service';
import { DeserializeClientService } from './deserialize-client.service';
import { GrantService } from './grant.service';
import { ExchangeService } from './exchange.service';

const oauth2orize = require('oauth2orize');

@Injectable()
export class InitializeOauthServerService extends AuthorizationService {
  private readonly server = oauth2orize.createServer();

  constructor(
    private readonly serializeClientService: SerializeClientService,
    private readonly deserializeCLientService: DeserializeClientService,
    private readonly grantService: GrantService,
    private readonly exchangeService: ExchangeService,
  ) {
    super();
  }

  async initialize() {
    this.serializeClientService.execute(this.server);
    await this.deserializeCLientService.execute(this.server);
    await this.grantService.execute(this.server);
    await this.exchangeService.execute(this.server);
    return this.server;
  }
}
