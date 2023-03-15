import {MigrationInterface, QueryRunner} from "typeorm";

export class seedColor1654606486858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`insert into color (id, name, hex_code) values (1, 'Khaki', '#e41608');
      insert into color (id, name, hex_code) values (2, 'Goldenrod', '#16f46c');
      insert into color (id, name, hex_code) values (3, 'Orange', '#e94a5d');
      insert into color (id, name, hex_code) values (4, 'Red', '#ba9c1d');
      insert into color (id, name, hex_code) values (5, 'Maroon', '#8bd16a');
      insert into color (id, name, hex_code) values (6, 'Indigo', '#59f7f5');
      insert into color (id, name, hex_code) values (7, 'Purple', '#b1cb8a');
      insert into color (id, name, hex_code) values (8, 'Maroon 2', '#9ece16');
      insert into color (id, name, hex_code) values (9, 'Khaki 2', '#7f3d9d');
      insert into color (id, name, hex_code) values (10, 'Blue', '#3648b7');
      insert into color (id, name, hex_code) values (11, 'Yellow', '#9ad47e');
      insert into color (id, name, hex_code) values (12, 'Aquamarine', '#3cb1a0');
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DELETE FROM COLOR`)
    }

}
