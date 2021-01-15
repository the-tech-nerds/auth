import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from '../../user/entities/user.entity';
import { CreatePasswordRequest } from '../requests/create-password.request';

@Injectable()
export class CreatePasswordService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(
    createPasswordRequest: CreatePasswordRequest,
  ): Promise<Boolean> {
    if (
      createPasswordRequest.new_password !==
      createPasswordRequest.new_password_confirm
    ) {
      throw new BadRequestException(
        'Sorry! Password confirmation did not match',
      );
    }

    const user = await this.userRepository.findOneOrFail(
      createPasswordRequest.user_id,
    );
    user.password = await hash(createPasswordRequest.new_password, 10);
    await this.userRepository.save(user);

    return true;
  }
}
