import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccessCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column()
  user_id: number;

  @Column()
  client_id: string;
}
