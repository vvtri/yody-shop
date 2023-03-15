import {MigrationInterface, QueryRunner} from "typeorm";

export class prepareDeploy1654594203881 implements MigrationInterface {
    name = 'prepareDeploy1654594203881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "color" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "hex_code" character varying NOT NULL, CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "content" character varying NOT NULL, "user_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product-image" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "public_id" character varying NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_c6db6eaddc596c5b041b89c3a2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product-rating" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "rating" smallint NOT NULL, "product_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "UQ_660f8182a76c3e7a39dc1ce82ea" UNIQUE ("product_id", "user_id"), CONSTRAINT "PK_b8d2bb2beae7617fe95f0faa924" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`CREATE TABLE "product" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "description" character varying NOT NULL, "name" character varying NOT NULL, "available" boolean NOT NULL, "unit" character varying NOT NULL, "gender" "public"."product_gender_enum" NOT NULL, "price" integer NOT NULL, "category_id" integer NOT NULL, "brand_id" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "size" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_66e3a0111d969aa0e5f73855c7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "amount" integer NOT NULL, "product_variation_id" integer NOT NULL, CONSTRAINT "REL_9c37bf05535960b33d6088bb88" UNIQUE ("product_variation_id"), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "total_price" integer NOT NULL, "item_count" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase-detail" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "product_variation_id" integer NOT NULL, "purchase_id" integer NOT NULL, CONSTRAINT "PK_d1c3c860da593d0e8e588ebdc3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product-variation" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "product_id" integer NOT NULL, "color_id" integer NOT NULL, "size_id" integer NOT NULL, CONSTRAINT "UQ_140c4859056d770a79055328cee" UNIQUE ("product_id", "color_id", "size_id"), CONSTRAINT "PK_dbf1efdd07966e920f55eb70805" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "quantity" integer NOT NULL, "user_id" integer NOT NULL, "product_variation_id" integer NOT NULL, CONSTRAINT "UQ_f5b36d3549f706d0e6155172672" UNIQUE ("user_id", "product_variation_id"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user-permission_action_enum" AS ENUM('create', 'read', 'update', 'delete', 'manage')`);
        await queryRunner.query(`CREATE TYPE "public"."user-permission_resource_enum" AS ENUM('user', 'product')`);
        await queryRunner.query(`CREATE TYPE "public"."user-permission_action_ability_enum" AS ENUM('can', 'cannot')`);
        await queryRunner.query(`CREATE TABLE "user-permission" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "action" "public"."user-permission_action_enum" NOT NULL, "resource" "public"."user-permission_resource_enum" NOT NULL, "action_ability" "public"."user-permission_action_ability_enum" NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "UQ_5bd9facb74959de62cbf29310ed" UNIQUE ("action", "resource", "action_ability"), CONSTRAINT "PK_4c07e3bf3214aacd29e5da711d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-reset-password" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "secret" character varying NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "UQ_b5997d6394f4f100fa893c97897" UNIQUE ("user_id"), CONSTRAINT "REL_b5997d6394f4f100fa893c9789" UNIQUE ("user_id"), CONSTRAINT "PK_df0ff658f4e6988b50e4eea87cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-verification" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "secret" character varying NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "UQ_39f1b1366ea1130e81e2c8ca225" UNIQUE ("user_id"), CONSTRAINT "REL_39f1b1366ea1130e81e2c8ca22" UNIQUE ("user_id"), CONSTRAINT "PK_fa6aace2709c3847c68303c9716" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying, "gender" "public"."user_gender_enum", "phone_number" character varying, "password" character varying NOT NULL, "address" character varying, "is_verified" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_f5007596a8e376886212b1c1e36" UNIQUE ("phone_number", "deleted_at"), CONSTRAINT "UQ_0590ddd805614bb8fc0dec74f82" UNIQUE ("email", "deleted_at"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-avatar" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "url" character varying NOT NULL, "public_id" character varying, "user_id" integer NOT NULL, CONSTRAINT "REL_0c2cfb6b7fba8c86635886a5e7" UNIQUE ("user_id"), CONSTRAINT "PK_37990a0fab2c4874c6ca35f1814" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_66a8816397e580b819e78d974dd" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product-image" ADD CONSTRAINT "FK_98115852964e3809f6ed0a09b1b" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product-rating" ADD CONSTRAINT "FK_c2c20c401fc1c6b47723ab0148a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product-rating" ADD CONSTRAINT "FK_f3edf89e29fa7f9be6f6fd4cdbf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_2eb5ce4324613b4b457c364f4a2" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_9c37bf05535960b33d6088bb883" FOREIGN KEY ("product_variation_id") REFERENCES "product-variation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_c4f9e58ae516d88361b37ed9532" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase-detail" ADD CONSTRAINT "FK_79166d1e341e480eb2ec4ccb8dd" FOREIGN KEY ("product_variation_id") REFERENCES "product-variation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase-detail" ADD CONSTRAINT "FK_2a5ddd02ae13cd5044d198ee1f9" FOREIGN KEY ("purchase_id") REFERENCES "purchase"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product-variation" ADD CONSTRAINT "FK_af75265d8f9f40b27bcd120f933" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product-variation" ADD CONSTRAINT "FK_197d5bca53a46db86a6b5fa5820" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product-variation" ADD CONSTRAINT "FK_59f0ad59d2812b1f3fa7c241f78" FOREIGN KEY ("size_id") REFERENCES "size"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_f091e86a234693a49084b4c2c86" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_3c0bd5c1f9f3821242fbd802014" FOREIGN KEY ("product_variation_id") REFERENCES "product-variation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-permission" ADD CONSTRAINT "FK_f2a583ebb13650ae64fddf7e3c9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-reset-password" ADD CONSTRAINT "FK_b5997d6394f4f100fa893c97897" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-verification" ADD CONSTRAINT "FK_39f1b1366ea1130e81e2c8ca225" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-avatar" ADD CONSTRAINT "FK_0c2cfb6b7fba8c86635886a5e78" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-avatar" DROP CONSTRAINT "FK_0c2cfb6b7fba8c86635886a5e78"`);
        await queryRunner.query(`ALTER TABLE "user-verification" DROP CONSTRAINT "FK_39f1b1366ea1130e81e2c8ca225"`);
        await queryRunner.query(`ALTER TABLE "user-reset-password" DROP CONSTRAINT "FK_b5997d6394f4f100fa893c97897"`);
        await queryRunner.query(`ALTER TABLE "user-permission" DROP CONSTRAINT "FK_f2a583ebb13650ae64fddf7e3c9"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_3c0bd5c1f9f3821242fbd802014"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_f091e86a234693a49084b4c2c86"`);
        await queryRunner.query(`ALTER TABLE "product-variation" DROP CONSTRAINT "FK_59f0ad59d2812b1f3fa7c241f78"`);
        await queryRunner.query(`ALTER TABLE "product-variation" DROP CONSTRAINT "FK_197d5bca53a46db86a6b5fa5820"`);
        await queryRunner.query(`ALTER TABLE "product-variation" DROP CONSTRAINT "FK_af75265d8f9f40b27bcd120f933"`);
        await queryRunner.query(`ALTER TABLE "purchase-detail" DROP CONSTRAINT "FK_2a5ddd02ae13cd5044d198ee1f9"`);
        await queryRunner.query(`ALTER TABLE "purchase-detail" DROP CONSTRAINT "FK_79166d1e341e480eb2ec4ccb8dd"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_c4f9e58ae516d88361b37ed9532"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_9c37bf05535960b33d6088bb883"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_2eb5ce4324613b4b457c364f4a2"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
        await queryRunner.query(`ALTER TABLE "product-rating" DROP CONSTRAINT "FK_f3edf89e29fa7f9be6f6fd4cdbf"`);
        await queryRunner.query(`ALTER TABLE "product-rating" DROP CONSTRAINT "FK_c2c20c401fc1c6b47723ab0148a"`);
        await queryRunner.query(`ALTER TABLE "product-image" DROP CONSTRAINT "FK_98115852964e3809f6ed0a09b1b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_66a8816397e580b819e78d974dd"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`);
        await queryRunner.query(`DROP TABLE "user-avatar"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP TABLE "user-verification"`);
        await queryRunner.query(`DROP TABLE "user-reset-password"`);
        await queryRunner.query(`DROP TABLE "user-permission"`);
        await queryRunner.query(`DROP TYPE "public"."user-permission_action_ability_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user-permission_resource_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user-permission_action_enum"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "product-variation"`);
        await queryRunner.query(`DROP TABLE "purchase-detail"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "size"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_gender_enum"`);
        await queryRunner.query(`DROP TABLE "product-rating"`);
        await queryRunner.query(`DROP TABLE "product-image"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "color"`);
    }

}
