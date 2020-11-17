import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../entities/client.entity';
import { AuthorizationService } from '../authorization.service';
import { uid } from '../../../utils/utils';
import { ClientRequest } from '../../../authentication/requests/client.request';

@Injectable()
export class CreateClientService extends AuthorizationService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {
    super();
  }

  async create(clientRequest: ClientRequest): Promise<Client> {
    const { name } = clientRequest;
    return this.clientRepository.save({
      name,
      secret: uid(64),
      createdBy: 1,
    });
  }
}
