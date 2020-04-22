import { BaseEntity, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { DateTimeHelper } from "@base/helpers";

export abstract class BaseModel extends BaseEntity{
  @Column({name:'created_at', type: 'bigint', nullable: true})
  createdAt;
  
  @Column({name:'update_at', type: 'bigint', nullable: true})
  updatedAt;

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