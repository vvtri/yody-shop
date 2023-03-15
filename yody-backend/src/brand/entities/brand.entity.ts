import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { Product } from "../../product/entities/product.entity";


@Entity()
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Product, product => product.brand, {cascade: ['insert']})
  products: Product[]
}