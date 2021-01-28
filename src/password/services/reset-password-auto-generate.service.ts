import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { EmailNotification } from '@the-tech-nerds/common-services';
import { User } from '../../user/entities/user.entity';
import { UserResponse } from '../../user/response/user.response';
import { uid } from '../../utils/utils';

@Injectable()
export class ResetPasswordAutoGenerateService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly emailNotification: EmailNotification,
  ) {}

  async execute(user_id: number): Promise<UserResponse> {
    const user = (await this.userRepository.findOne(user_id)) as User;
    const { email = null, first_name: firstName } = user;
    if (!email) {
      throw new BadRequestException(
        'This is user is not associated with an email, ' +
          'cannot reset password',
      );
    }

    const newGeneratedPassword = uid(10);
    const updatedUser = {
      ...user,
      password: await hash(newGeneratedPassword, 10),
    };
    await this.userRepository.save({
      ...updatedUser,
    });

    this.emailNotification.send({
      template: 'authentication/admin-reset-password',
      to: [email],
      subject: `New password for ${firstName}!`,
      data: {
        name: `${firstName}`,
        password: newGeneratedPassword,
      },
    });

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      image_url: user.image_url,
      birthday: user.birthday,
      is_mobile_verified: user.is_mobile_verified,
      gender_type: user.gender_type,
    };
  }
}
