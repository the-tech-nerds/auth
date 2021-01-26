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

  async validate(userName: string, password: string, type: number) {
    const user = await this.userRepository.findOne({
      where: [
        { email: userName, type },
        { phone: userName, type },
      ],
    });

    if (!user) {
      throw new BadRequestException(`User with email ${userName} not found`);
    }

    const { password: hashedPassword, ...result } = user;

    const verify = await compare(password, hashedPassword);

    if (!verify) {
      throw new BadRequestException('Password did not match');
    }

    return result;
  }
}
