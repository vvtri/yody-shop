import { MigrationInterface, QueryRunner } from 'typeorm'

export class seedBrand1654606289952 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`insert into brand(id, name)
      values 
        (1, 'ELISE'),
          (2, 'VASCARA'),
          (3, 'JUNO'),
          (4, 'GUMAC'),
          (5, 'IVY MODA'),
          (6, 'HNOSS'),
          (7, 'SIXDO'),
          (8, 'FM STYLE'),
          (9, 'NEM FASHION'),
          (10, 'CANIFA'),
          (11, 'YODY'),
          (12, 'ADAM STORE'),
          (13, 'YAME'),
          (14, 'BILUXURY'),
          (15, 'OWEN'),
          (16, 'VIỆT TIẾN'),
          (17, 'PIERRE CARDIN'),
          (18, 'SSSTUTTER'),
          (19, 'ROUTINE');`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM BRAND`)
  }
}
