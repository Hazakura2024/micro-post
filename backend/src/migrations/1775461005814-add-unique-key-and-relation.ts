import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueKeyAndRelation1775461005814 implements MigrationInterface {
    name = 'AddUniqueKeyAndRelation1775461005814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "UQ_f4aae9866cf436c5fb567f0d599" UNIQUE ("token")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "micro_post" ADD CONSTRAINT "FK_e3703e9042ef6eb36126155ad35" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_9922406dc7d70e20423aeffadf3" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_9922406dc7d70e20423aeffadf3"`);
        await queryRunner.query(`ALTER TABLE "micro_post" DROP CONSTRAINT "FK_e3703e9042ef6eb36126155ad35"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "UQ_f4aae9866cf436c5fb567f0d599"`);
    }

}
