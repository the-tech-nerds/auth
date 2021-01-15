import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

export class UserValidationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userRepository.findOne({
      email,
    });

    if (!user) {
      throw new BadRequestException(`User with email ${email} not found`);
    }

    const { password: hashedPassword, ...result } = user;

    const verify = await compare(password, hashedPassword);

    if (!verify) {
      throw new BadRequestException('Password did not match');
    }

    return result;
  }
}
