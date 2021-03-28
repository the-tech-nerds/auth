import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User, UserType } from '../entities/user.entity';

export class UserMockCreateService {
  constructor(
    @InjectRepository(User)
    private userRepositoy: Repository<User>,
  ) {}

  /**
   * Create count number of mock users
   *
   * @param count
   * should be a number
   */
  async execute(count: number) {
    const genericPassword = await hash('1234', 10);

    const users = [...Array(count).keys()].map(
      (_, key: number) =>
        ({
          first_name: 'User',
          last_name: `${key}`,
          email: `user-${key}@gmail.com`,
          password: genericPassword,
          type: UserType.USER,
          created_by: 1,
        } as User),
    );

    await this.userRepositoy.save(users);
  }
}
