import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserShopMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  shop_id: number;
}
