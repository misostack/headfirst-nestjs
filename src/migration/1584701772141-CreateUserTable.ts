import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1584701772141 implements MigrationInterface {
    name = 'CreateUserTable1584701772141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(360) NOT NULL, "password" character varying(1) DEFAULT '', "passwordHash" character varying(60) NOT NULL, "firstName" character varying(60) NOT NULL, "lastName" character varying(60) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
