import BaseEntity from 'src/share/entities/base-entity';

interface Address extends BaseEntity {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  facebookAuth: string;
  googleAuth: string;
  imageUrl: string;
  type: string;
  isActive: boolean;
}
