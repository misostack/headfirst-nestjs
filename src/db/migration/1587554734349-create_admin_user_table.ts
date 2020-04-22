import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateAdminUserTable1587554734349 implements MigrationInterface {
    name = 'CreateAdminUserTable1587554734349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // add uuid extension
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`, undefined);
        // create types
        await queryRunner.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_user_role_enum') THEN
              CREATE TYPE admin_user_role_enum AS ENUM ('sadmin', 'admin', 'supervisor');
          END IF;
        END
        $$;        
        `, undefined);
        await queryRunner.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_user_status_enum') THEN
              CREATE TYPE admin_user_status_enum AS ENUM ('active', 'inactive', 'deleted');
          END IF;
        END
        $$;    
        `, undefined);   
        // create table
        const table_name = 'admin_user';
        await queryRunner.createTable(new Table({
            name: table_name,
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isNullable: false,
                    default: "uuid_generate_v4()",
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "360",
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "60",
                    isNullable: false,
                },
                {
                    name: "firstName",
                    type: "varchar",
                    length: "60",
                    isNullable: false,
                },
                {
                    name: "lastName",
                    type: "varchar",
                    length: "60",
                    isNullable: false,
                },
                {
                    name: "role",
                    type: "admin_user_role_enum",
                    isNullable: false,
                },
                {
                    name: "status",
                    type: "admin_user_status_enum",
                    isNullable: false,
                },
                {
                    name: "created_at",
                    type: "bigint",
                    isNullable: false,
                },
                {
                    name: "updated_at",
                    type: "bigint",
                    isNullable: false,
                },
            ]
        }), true);
        // add indexes
        await queryRunner.createIndex(table_name, new TableIndex({
            name: "IDX_EMAIL",
            columnNames: ["email"]
        }));
        await queryRunner.createIndex(table_name, new TableIndex({
            name: "IDX_FIRSTNAME_LASTNAME",
            columnNames: ["first_name", "last_name"]
        }));        
        // add constraints
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table_name = 'admin_user';        
        await queryRunner.dropIndex(table_name, 'IDX_EMAIL');
        await queryRunner.dropIndex(table_name, 'IDX_FIRSTNAME_LASTNAME');
        await queryRunner.dropTable(table_name);
        await queryRunner.query(`DROP TYPE "admin_user_role_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "admin_user_status_enum"`, undefined);
    }

}
