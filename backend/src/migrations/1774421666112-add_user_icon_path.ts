import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIconPath1774421666112 implements MigrationInterface {
    name = 'AddUserIconPath1774421666112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "icon_path" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "icon_path"`);
    }

}
