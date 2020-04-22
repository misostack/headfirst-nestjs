import {MigrationInterface, QueryRunner} from "typeorm";

export class InitSchema1587554734349 implements MigrationInterface {
    name = 'InitSchema1587554734349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "base_user_status_enum" AS ENUM('active', 'inactive', 'deleted')`, undefined);
        await queryRunner.query(`CREATE TABLE "base_user" ("created_at" bigint, "update_at" bigint, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(360) NOT NULL, "password" character varying(120) NOT NULL, "first_name" character varying(60) NOT NULL, "last_name" character varying(60) NOT NULL, "status" "base_user_status_enum" NOT NULL DEFAULT 'inactive', CONSTRAINT "UQ_28c4f981c5608c6c02b4319efc2" UNIQUE ("email"), CONSTRAINT "PK_fb59959fd207defc2d090661488" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "admin_user_status_enum" AS ENUM('active', 'inactive', 'deleted')`, undefined);
        await queryRunner.query(`CREATE TYPE "admin_user_role_enum" AS ENUM('sadmin', 'admin', 'supervisor')`, undefined);
        await queryRunner.query(`CREATE TABLE "admin_user" ("created_at" bigint, "update_at" bigint, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(360) NOT NULL, "password" character varying(120) NOT NULL, "first_name" character varying(60) NOT NULL, "last_name" character varying(60) NOT NULL, "status" "admin_user_status_enum" NOT NULL DEFAULT 'inactive', "role" "admin_user_role_enum" NOT NULL, CONSTRAINT "UQ_840ac5cd67be99efa5cd989bf9f" UNIQUE ("email"), CONSTRAINT "PK_a28028ba709cd7e5053a86857b4" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin_user"`, undefined);
        await queryRunner.query(`DROP TYPE "admin_user_role_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "admin_user_status_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "base_user"`, undefined);
        await queryRunner.query(`DROP TYPE "base_user_status_enum"`, undefined);
    }

}
