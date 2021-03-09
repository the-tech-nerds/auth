import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../../authorization/services/authorization.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UpdateUserFreezeStatusService extends AuthorizationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async unfreezeUser(user_id: number): Promise<User> {
    let user = await this.userRepository.findOneOrFail(user_id);
    user.is_frozen = false;

    user = await this.userRepository.save(user);

    return user;
  }
}
