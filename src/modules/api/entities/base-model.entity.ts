import { BaseEntity, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { DateTimeHelper } from "@base/helpers";

export abstract class BaseModel extends BaseEntity{
  @Column({name:'created_at', type: 'bigint', nullable: false})
  createdAt: number;
  
  @Column({name:'updated_at', type: 'bigint', nullable: false})
  updatedAt: number;

  @BeforeInsert()
  beforeInsert() {
    const now = DateTimeHelper.now();;
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = DateTimeHelper.now();
  }
}