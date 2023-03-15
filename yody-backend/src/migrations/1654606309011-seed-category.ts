import { MigrationInterface, QueryRunner } from 'typeorm'

export class seedCategory1654606309011 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`insert into category(id, name)
      values 
        (1, 'Áo polo'),
          (2, 'Áo sơ mi'),
          (3, 'Áo thun'),
          (4, 'Áo khoác'),
          (5, 'Quần jean'),
          (6, 'Quần âu'),
          (7, 'Quần kaki'),
          (8, 'Quần short'),
          (9, 'Áo vest'),
          (10, 'Quần jean'),
          (11, 'Quần tây'),
          (12, 'Chân váy'),
          (13, 'Váy liền thân');`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM CATEGORY`)
  }
}
