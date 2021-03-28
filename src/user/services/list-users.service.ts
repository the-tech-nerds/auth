import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  PaginateQuery,
  Paginated,
} from '@the-tech-nerds/common-services';
import { Repository } from 'typeorm';
import { User, UserType } from '../entities/user.entity';

@Injectable()
export class ListUsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(
    userType: string,
    query: PaginateQuery,
  ): Promise<Paginated<User>> {
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.type = :user_type', {
        user_type: userType ? Number(userType) : UserType.USER,
      })
      .andWhere('email <> :email', { email: 'admin@khanfcbd.com' });

    return paginate(query, queryBuilder, User, {
      sortableColumns: ['id', 'first_name', 'last_name'],
      searchableColumns: ['first_name', 'last_name', 'email'],
      defaultSortBy: [['id', 'ASC']],
    });
  }
}
