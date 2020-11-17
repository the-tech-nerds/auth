import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Client } from '../../authorization.entity';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class DeserializeClientService extends AuthorizationService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {
    super();
  }

  async execute(server: any) {
    server.deserializeClient(async (id: any, callback: any) => {
      try {
        const client = await this.clientRepository.findOne({
          id,
        });
        return callback(null, client);
      } catch (e) {
        throw new UnauthorizedException('Unauthorized Client');
      }
    });
  }
}
