import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/authorization/authorization.entity';
import { AuthorizationService } from '../authorization.service';
import { uid } from '../../../utils/utils';

@Injectable()
export class CreateClientService extends AuthorizationService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {
    super();
  }

  async create(name: string): Promise<Client> {
    return this.clientRepository.save({
      name,
      secret: uid(64),
      createdBy: 1,
    });
  }
}
