import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseModel extends BaseEntity{
  @CreateDateColumn({name:'created_at', type: 'timestamp with time zone'})
  createdAt;
  
  @UpdateDateColumn({name:'update_at', type: 'timestamp with time zone'})
  updatedAt;
}