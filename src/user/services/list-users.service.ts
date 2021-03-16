import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginateQuery, Paginated } from 'src/utils/pagination';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

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
      .where('user.type = :user_type', { user_type: userType })
      .andWhere('email <> :email', { email: 'admin@khanfcbd.com' });

    return paginate(query, queryBuilder, User, {
      sortableColumns: ['id', 'first_name', 'last_name'],
      searchableColumns: ['first_name', 'last_name', 'email'],
      defaultSortBy: [['id', 'ASC']],
    });

    // find({
    //   where: {
    //     type: Number(userType),
    //     email: Not(Equal('admin@khanfcbd.com')),
    //   },
    //   relations: ['roles'],
    // });
    // return
  }
}
