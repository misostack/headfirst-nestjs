import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseModel } from './base-model.entity';
import { UserStatusEnum } from '@api/enums';
import { EncryptHelper } from '@base/helpers';

export abstract class BaseUser extends BaseModel{
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

  @Column("enum", { 
    enum: UserStatusEnum,
    nullable: false,
    default: UserStatusEnum.INACTIVE,
  })
  status: UserStatusEnum;

  @BeforeInsert()
  @BeforeUpdate()  
  hashedPassword() {
    this.password = EncryptHelper.hash(this.password);
  }
}