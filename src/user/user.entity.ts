import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type userType = "admin" | "user"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  firstName: string;

  @Column({
    length: 100
  })
  lastName: string;

  @Column({
    length: 100
  })
  email: string;

  @Column()
  password: string;

  @Column({nullable:true})
  facebookAuth: string;

  @Column({nullable:true})
  googleAuth: string;

  @Column({nullable:true})
  imageUrl: string;

  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user"
})
role: userType

  @Column({ default: true })
  isActive: boolean;
}
