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
      .select([
        'user.first_name',
        'user.last_name',
        'user.email',
        'user.phone',
        'user.gender_type',
        'user.birthday',
        'user.image_url',
        'user.type',
        'user.is_active',
        'user.is_frozen',
        'user.is_mobile_verified',
        'user.is_email_verified',
        'roles.name',
        'roles.is_active',
      ])
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
