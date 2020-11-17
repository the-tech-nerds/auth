import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AccessCode } from '../../entities/access-code.entity';
import { AccessToken } from '../../entities/access-token.entity';
import { Client } from '../../entities/client.entity';
import { AuthorizationService } from '../authorization.service';
import { uid } from '../../../utils/utils';

const oauth2orize = require('oauth2orize');

@Injectable()
export class ExchangeService extends AuthorizationService {
  constructor(
    @InjectRepository(AccessCode)
    private accessCodeRepository : Repository<AccessCode>,
    @InjectRepository(AccessToken)
    private accessTokenRepository : Repository<AccessToken>,
  ) {
    super();
  }

  async execute(server: any) {
    return server.exchange(oauth2orize.exchange.code(
      { userProperty: 'client' },
      async (client: Client, code: string, redirectUri: string, callback: any) => {
        try {
          const authCode = await this.accessCodeRepository.findOne({ value: code });
          if (!authCode) {
            return callback(null, false);
          }

          if (client.id.toString() !== authCode.client_id) {
            return callback(null, false);
          }

          try {
            await this.accessCodeRepository.remove(authCode);
          } catch (e) {
            return callback(e);
          }

          const token = {
            value: uid(64),
            client_id: authCode.client_id,
            user_id: authCode.user_id,
            createdBy: authCode.user_id,
          } as AccessToken;

          try {
            const savedToken = await this.accessTokenRepository.save(token);
            return callback(null, savedToken, null,
              { code: 200, data: { access_token: savedToken } });
          } catch (e) {
            return callback(e);
          }
        } catch (e) {
          return callback(e);
        }
      },
    ));
  }
}
