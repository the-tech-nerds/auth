import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AuthorizationService } from '../authorization.service';
import { AccessCode, Client } from '../../authorization.entity';
import { User } from '../../../user/user.entity';
import { uid } from '../../../utils/utils';

const oauth2orize = require('oauth2orize');

@Injectable()
export class GrantService extends AuthorizationService {
  constructor(
    @InjectRepository(AccessCode)
    private readonly accessCodeRepository: Repository<AccessCode>,
  ) {
    super();
  }

  async execute(server: any) {
    const that = this;
    server.grant(oauth2orize.grant.code(
      async (client: Client, redirectUri: string, user: User, ares: any, callback: any) => {
        const code = {
          value: uid(16),
          clientId: client.id,
          userId: user.id,
        } as AccessCode;

        try {
          await that.accessCodeRepository.save(code);
          return callback(null, code.value);
        } catch (e) {
          return callback(e);
        }
      },
    ));
  }
}
