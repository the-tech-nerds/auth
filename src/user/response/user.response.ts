export class UserResponse {
  id: number;

  first_name: string;

  last_name: string;

  email: string;

  phone: string;

  image_url: string;

  gender_type?: number;

  is_mobile_verified: boolean;

  birthday?: Date;

  roles?: any[];
}
