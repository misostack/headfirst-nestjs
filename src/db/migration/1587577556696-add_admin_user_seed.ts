import {MigrationInterface, QueryRunner, getConnection} from "typeorm";
import { AdminUser } from "@api/entities";
import { AdminUserRoleEnum, UserStatusEnum } from "@api/enums";
import { DateTimeHelper, EncryptHelper } from "@base/helpers";

export class AddAdminUserSeed1587577556696 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {        
        const password_hashed = await EncryptHelper.hash("123456");
        await getConnection()
        .createQueryBuilder(queryRunner)
        .insert()
        .into(AdminUser)
        .values([
            { 
                email:"contact@sonnm.com", 
                password: password_hashed,
                firstName: "Son", lastName: "Nguyen",
                role: AdminUserRoleEnum.SADMIN,
                status: UserStatusEnum.ACTIVE,
                createdAt: DateTimeHelper.now(),
                updatedAt: DateTimeHelper.now(),
            },
         ])
        .execute();        
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await getConnection()
        .createQueryBuilder(queryRunner)
        .delete()
        .from(AdminUser)
        .where("email = :email", { email: 'contact@sonnm.com' })
        .execute();        
    }

}
