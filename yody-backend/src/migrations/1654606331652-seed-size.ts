import {MigrationInterface, QueryRunner} from "typeorm";

export class seedSize1654606331652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`insert into size (id, name) values (1, 'S');
      insert into size (id, name) values (2, 'M');
      insert into size (id, name) values (3, 'L');
      insert into size (id, name) values (4, 'XL');
      insert into size (id, name) values (5, '2XL');
      insert into size (id, name) values (6, '3XL');
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DELETE FROM SIZE;`)
    }

}
