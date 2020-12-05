import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Address } from '../../address/entities/address.entity';

@Injectable()
export class GetAddressesByUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(userId: number): Promise<Address[] | undefined> {
    const user = await this.usersRepository.findOne({
      id: userId,
    });
    console.log(user);
    return user?.addresses;
  }
}
