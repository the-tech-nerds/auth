import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '@the-tech-nerds/common-services';
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
    private readonly cacheService: CacheService,
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
      const user = await this.userRepository.save(USER);
      // delete user access token if exist
      await this.cacheService.delete(`user-token-${user_id}`);
      // @ts-ignore
      return { user };
    } catch (e) {
      return null;
    }
  }
}
