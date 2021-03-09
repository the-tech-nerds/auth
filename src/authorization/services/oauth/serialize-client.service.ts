import { Injectable } from '@nestjs/common';
import { AuthorizationService } from '../authorization.service';
import { Client } from '../../entities/client.entity';

@Injectable()
export class SerializeClientService extends AuthorizationService {
  execute(server: any) {
    // eslint-disable-next-line no-underscore-dangle
    server.serializeClient((client: Client, callback: any) =>
      callback(null, client.id),
    );
  }
}
