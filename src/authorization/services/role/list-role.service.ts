import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../../entities/role.entity';

export class ListRoleService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  async getAll(): Promise<Roles[]> {
    return this.roleRepository.find({
      where: {
        // is_active: true,
        deleted_at: null,
      },
    });
  }
}
