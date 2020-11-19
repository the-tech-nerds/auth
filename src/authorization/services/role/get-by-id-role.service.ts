import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../../entities/role.entity';

export class GetByIdRoleService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  async getById(id: number): Promise<Roles | undefined> {
    return this.roleRepository.findOne(id);
  }
}
