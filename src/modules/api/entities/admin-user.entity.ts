import { Entity, Column } from "typeorm";
import { BaseUser } from "./base-user.entity";
import { AdminUserRoleEnum } from "@api/enums";

@Entity()
export class AdminUser extends BaseUser {
    
  @Column("enum", { enum: AdminUserRoleEnum })
  role: AdminUserRoleEnum;
  
}