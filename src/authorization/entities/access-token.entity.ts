import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';

@Entity()
export class AccessToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column()
  user_id: number;

  @Column()
  client_id: string;
}
