import { InjectRepository } from '@nestjs/typeorm';
import { Equal, IsNull, Not, Repository } from 'typeorm';
import { Roles } from '../../entities/role.entity';

export class ListRoleService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  async getAll(): Promise<Roles[]> {
    return this.roleRepository.find({
      where: {
        deleted_at: IsNull(),
        name: Not(Equal('Super Admin')),
      },
      relations: ['users'],
    });
  }
}
