import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationService } from '../../authorization/services/authorization.service';
import { Roles } from '../../authorization/entities/role.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class AssignRolesInUserService extends AuthorizationService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async assign(
    user_id: number,
    roles: number[],
  ): Promise<{ user: User | undefined } | null> {
    try {
      const USER = await this.userRepository.findOne(user_id);
      // @ts-ignore
      USER?.roles = (await this.rolesRepository.findByIds(roles)) || [];
      // @ts-ignore
      return { user: await this.userRepository.save(USER) };
    } catch (e) {
      return null;
    }
  }
}
