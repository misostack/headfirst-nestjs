import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: "varchar",
    length: 360,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 1,
    nullable: true,
    default: ""
  })
  password: string;

  @Column({
    type: "varchar",
    length: 60,
    nullable: false,
  })
  passwordHash: string;

  @Column({
    type: "nvarchar",
    length: 60,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: "nvarchar",
    length: 60,
    nullable: false,
  })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}