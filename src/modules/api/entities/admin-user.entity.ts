import { Entity, Column } from "typeorm";
import { BaseUser } from "./base-user.entity";
import { AdminUserRoleEnum } from "@api/enums";

@Entity()
export class AdminUser extends BaseUser {

  constructor(partial: Partial<AdminUser>) {
    super();
    Object.assign(this, partial);
  }

  @Column("enum", { enum: AdminUserRoleEnum })
  role: AdminUserRoleEnum;
  
}