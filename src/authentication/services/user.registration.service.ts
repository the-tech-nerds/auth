import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';
import { EmailNotification } from '@the-tech-nerds/common-services';
import { User, UserType } from '../../user/entities/user.entity';
import { UserRegistrationRequest } from '../requests/user.registration.request';
import { uid } from '../../utils/utils';

export class UserRegistrationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailNotification: EmailNotification,
  ) {}

  async register(userData: UserRegistrationRequest) {
    const {
      password = '',
      type = UserType.USER,
      email = undefined,
      phone = undefined,
    } = userData;

    const user = await this.userRepository.findOne({
      where: [
        { email, type },
        { phone, type },
      ],
    });

    if (user) {
      throw new BadRequestException(
        'Account already exist for this email or phone number.',
      );
    }
    const passwordToSave = type === UserType.ADMIN ? uid(10) : password;

    if (email && type === UserType.ADMIN) {
      this.emailNotification.send({
        template: 'authentication/admin-user-create',
        to: [email],
        subject: 'Admin Invitation for Khan Fresh Corner BD!',
        data: {
          loginUrl: process.env.LOGIN_URL,
          email,
          password: passwordToSave,
        },
      });
    }

    const {
      first_name: firstName,
      last_name: lastName,
      email: savedEmail,
      phone: savedPhone,
      image_url: imageUrl,
      id,
    } = await this.userRepository.save({
      ...userData,
      type,
      password:
        passwordToSave.length > 4
          ? await hash(passwordToSave, 10)
          : passwordToSave,
      created_by: 1,
    });
    return {
      first_name: firstName,
      last_name: lastName,
      email: savedEmail,
      image_url: imageUrl,
      id,
      phone: savedPhone,
    };
  }
}
