import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';

export enum RequestSource {
  ADMIN = 1,
  USER = 2,
}

@Entity()
export class LoginHistories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: true,
  })
  email: string;

  @Column({
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'enum',
    enum: RequestSource,
    default: RequestSource.USER,
  })
  request_source: RequestSource;

  @Column()
  status: boolean;
}
