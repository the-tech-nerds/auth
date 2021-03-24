import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserShopMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  shop_id: number;

  @ManyToOne(
    () => User,
    user => user.userShop,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;
}
