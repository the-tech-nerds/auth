import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { AuthorizationService } from '../authorization.service';
import { Client } from '../../entities/client.entity';
import { InitializeOauthServerService } from './initialize-oauth-server.service';

export class AuthorizeService extends AuthorizationService {
  constructor(
    private readonly initializeOauthServerService: InitializeOauthServerService,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {
    super();
  }

  async authorize() {
    const server = await this.initializeOauthServerService.initialize();
    return server.authorization(
      async (clientId: string, redirectUri: string, callback: any) => {
        try {
          const client = await this.clientRepository.findOne({ id: clientId });
          if (!client) {
            throw new UnauthorizedException('Unauthorized Client');
          }
          return callback(null, client, redirectUri);
        } catch (e) {
          return callback(e);
        }
      },
      (req: any, res: any) => res(null, req, res),
    );
  }
}
