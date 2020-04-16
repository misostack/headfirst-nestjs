import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity()
export abstract class User extends BaseModel{
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
    length: 120,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'first_name',
    type: "varchar",
    length: 60,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: "varchar",
    length: 60,
    nullable: false,
  })
  lastName: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name:'is_deleted', default: false })
  isDeleted: boolean;
}