import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Roles } from '../../entities/role.entity';

export class DeleteRoleService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  async delete(id: number): Promise<UpdateResult> {
    return this.roleRepository.softDelete(id);
  }
}
