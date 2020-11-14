import { Injectable, Module, CacheModule } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { Permissions } from 'src/authorization/authorization.entity';
import { RedisCacheService } from './redisCache.service';

@Injectable()
export class DeletePermissionService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) {
  }

  async delete(id: number): Promise<UpdateResult> {
    return this.permissionRepository.softDelete(id);
  }
}
