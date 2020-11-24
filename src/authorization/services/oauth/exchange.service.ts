import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessCode } from '../../entities/access-code.entity';
import { AccessToken } from '../../entities/access-token.entity';
import { Client } from '../../entities/client.entity';
import { AuthorizationService } from '../authorization.service';

const oauth2orize = require('oauth2orize');

@Injectable()
export class ExchangeService extends AuthorizationService {
  constructor(
    @InjectRepository(AccessCode)
    private accessCodeRepository: Repository<AccessCode>,
    @InjectRepository(AccessToken)
    private accessTokenRepository: Repository<AccessToken>,
    private jwtService: JwtService,
  ) {
    super();
  }

  async execute(server: any) {
    return server.exchange(
      oauth2orize.exchange.code(
        { userProperty: 'client' },
        async (
          client: Client,
          code: string,
          redirectUri: string,
          callback: any,
        ) => {
          try {
            const authCode = await this.accessCodeRepository.findOne({
              value: code,
            });
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

            /** eslint-disable */
            const { client_id: clientId = '', user_id: userId = 0 } = authCode;
            /** eslint-disable */

            const token = {
              value: this.jwtService.sign({
                client_id: clientId,
                user_id: userId,
              }),
              client_id: clientId,
              user_id: userId,
              created_by: userId,
            } as AccessToken;

            try {
              const savedToken = await this.accessTokenRepository.save(token);
              const accessToken = {
                value: savedToken.value,
                client_id,
                user_id,
                id: savedToken.id,
              };
              return callback(null, accessToken, null, {
                code: 200,
                data: {
                  access_token: accessToken,
                },
              });
            } catch (e) {
              return callback(e);
            }
          } catch (e) {
            return callback(e);
          }
        },
      ),
    );
  }
}
