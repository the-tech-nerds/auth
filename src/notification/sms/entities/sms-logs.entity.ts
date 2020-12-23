import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SMSLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sid: string;

  @Column({ length: 20 })
  csms_id: string;

  @Column()
  api_token: string;

  @Column({ length: 16 })
  msisdn: string;

  @Column({ nullable: true })
  reference_id: string;

  @Column()
  body: string;

  @Column()
  purpose: string;

  @Column({ default: 'en', length: 8 })
  sms_lang: string;

  @Column({ nullable: true, length: 16 }) // success or invalid or duplicate
  sms_status: string;

  @Column({ nullable: true }) // success or invalid or duplicate
  code: number;

  @Column({ nullable: true })
  status_message: string;

  @Column({ nullable: true })
  user_id: number;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
