import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetGoodsId1678898323364 implements MigrationInterface {
  private tableName = 'goods_entity';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${this.tableName} AUTO_INCREMENT = 10000;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${this.tableName} AUTO_INCREMENT = 1;`,
    );
  }
}
