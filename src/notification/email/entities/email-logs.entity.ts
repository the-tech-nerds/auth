import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DeliveryStatus {
  GENERATED = 'generated',
  SEND = 'send',
  FAILED = 'failed',
}

export enum TrackingType {
  DEVICE = 'device',
  USER = 'user',
  TRANSACTION = 'transaction',
}

@Entity()
export class EmailLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  to: string;

  @Column({ length: 128 })
  from: string;

  @Column({ type: 'json', nullable: true })
  cc: string;

  @Column({ type: 'json', nullable: true })
  bcc: string;

  @Column()
  subject: string;

  @Column({ type: 'text', nullable: true })
  body: string;

  @Column({ nullable: true })
  template: string;

  @Column({ type: 'json', nullable: true })
  data: string;

  @Column()
  purpose: string;

  @Column({
    comment:
      'tracking id can be any one these one [device_key, user_id, transaction_id]',
  })
  tracking_id: string;

  @Column({
    type: 'enum',
    enum: TrackingType,
    default: TrackingType.DEVICE,
  })
  tracking_type: string;

  @Column({ nullable: true, type: 'text' })
  fail_reason: string;

  @Column({ nullable: true, type: 'json' })
  aws_success_response: string;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.GENERATED,
  })
  delivery_status: string;

  @Column({ type: 'json', nullable: true })
  attachments: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
