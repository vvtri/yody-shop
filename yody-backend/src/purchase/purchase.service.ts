import { Injectable } from "@nestjs/common";
import { paginate, Pagination } from "nestjs-typeorm-paginate";
import { getManager } from "typeorm";
import { User } from "../auth/entities/user.entity";
import { Cart } from "../cart/entities/cart.entity";
import { CartRepository } from "../cart/repositories/cart.repository";
import { PaginateQueryDto } from "../common/dtos/paginate-query.dto";
import { OutOfStockPurchaseExc } from "../common/exceptions/index.exception";
import { Inventory } from "../inventory/entities/inventory.entity";
import { InventoryRepository } from "../inventory/repositories/inventory.repository";
import { generateErrorOutOfStock } from "../product/utils/index.util";
import { PurchaseDetail } from "./entities/purchase-detail.entity";
import { Purchase } from "./entities/purchase.entity";
import { PurchaseDetailRepository } from "./repositories/purchase-detail.repository";
import { PurchaseRepository } from "./repositories/purchase.repository";

@Injectable()
export class PurchaseService {
  constructor(
    private purchaseRepo: PurchaseRepository,
    private purchaseDetailRepo: PurchaseDetailRepository,
    private inventoryRepo: InventoryRepository,
    private cartRepo: CartRepository
  ) {}

  async purchaseProductInCart(user: User) {
    await getManager().transaction(async (manager) => {
      /**
       * 1. We need to get cart and inventory, and lock both, but we can not lock with left join, left can just be used with inner join
       * 2. So we get cart and productVariation, because cart.productVariationId is not null, so we can make sure result from inner join are 100% intact
       * 3. After we get cart and productVariation, we get inventory by productVariationId, and lock it
       */
      const carts = await manager
        .createQueryBuilder(Cart, "cart")
        .where("cart.userId = :userId", { userId: user.id })
        .innerJoinAndSelect("cart.productVariation", "productVariation")
        .innerJoinAndSelect("productVariation.product", "product")
        .setLock("pessimistic_write")
        .getMany();

      const inventories = await manager
        .createQueryBuilder(Inventory, "inventory")
        .where("inventory.product_variation_id IN (:...productVariationIds)", {
          productVariationIds: carts.map((cart) => cart.productVariationId),
        })
        .setLock("pessimistic_write")
        .getMany();

      // We compare cart quantity and inventory quantity
      let errorMsgs = [];
      carts.forEach((cart) => {
        const inventory = inventories.find(
          (item) => item.productVariationId === cart.productVariationId
        );
        if (!inventory)
          errorMsgs.push(
            generateErrorOutOfStock(cart.productVariation.product.name, 0)
          );
        if (inventory.amount < cart.quantity)
          errorMsgs.push(
            generateErrorOutOfStock(
              cart.productVariation.product.name,
              inventory.amount
            )
          );
      });
      if (errorMsgs.length > 0) throw new OutOfStockPurchaseExc(errorMsgs);

      /**
       * Now everything is fine, we need:
       * 1. Create purchase and purchase detail
       * 2. Minus inventory
       * 3. Delete cart
       */

      const purchaseDetailList = carts.map((cart) =>
        manager.getRepository(PurchaseDetail).create({
          price: cart.productVariation.product.price,
          productVariationId: cart.productVariationId,
          quantity: cart.quantity,
        })
      );
      const purchase = manager.getRepository(Purchase).create({
        purchaseDetails: purchaseDetailList,
        userId: user.id,
      });

      const promises = [];

      // 1. Create purchase and purchase detail
      promises.push(manager.getRepository(Purchase).save(purchase));

      // 2. Minus inventory amount
      carts.forEach((cart) =>
        promises.push(
          manager
            .getRepository(Inventory)
            .decrement(
              { productVariationId: cart.productVariationId },
              "amount",
              cart.quantity
            )
        )
      );

      // 3. Delete cart
      promises.push(
        manager.getRepository(Cart).delete(carts.map((cart) => cart.id))
      );

      await Promise.all(promises);
    });
  }

  // Example of hydrate
  async getPurchaseHistory(query: PaginateQueryDto, user: User) {
    const { page, size } = query;
    const queryBuilder = this.purchaseRepo
      .createQueryBuilder("purchase")
      .where("purchase.userId = :userId", { userId: user.id });
    const result = await paginate<Purchase>(queryBuilder, {
      limit: size,
      page,
    });
    return new Pagination(
      await Promise.all(
        result.items.map(async (item) => {
          const purchaseDetails = await this.purchaseDetailRepo
            .createQueryBuilder("purchaseDetail")
            // .leftJoinAndSelect(
            // 	'purchaseDetail.productVariation',
            // 	'productVariation'
            // )
            // .leftJoinAndSelect('productVariation.color', 'color')
            // .leftJoinAndSelect('productVariation.size', 'size')
            // .leftJoinAndSelect('productVariation.product', 'product')
            // .leftJoinAndSelect('product.productImages', 'productImages')
            .where("purchaseDetail.purchaseId = :purchaseId", {
              purchaseId: item.id,
            })
            .getMany();
          item.purchaseDetails = purchaseDetails;
          return item;
        })
      ),
      result.meta,
      result.links
    );
  }

  async getPurchaseDetail(purchaseId: number, user: User) {
    return this.purchaseDetailRepo
      .createQueryBuilder("purchaseDetail")
      .leftJoinAndSelect("purchaseDetail.productVariation", "productVariation")
      .leftJoinAndSelect("productVariation.color", "color")
      .leftJoinAndSelect("productVariation.size", "size")
      .leftJoinAndSelect("productVariation.product", "product")
      .leftJoinAndSelect("product.brand", "brand")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.productImages", "productImages")
      .leftJoin("purchaseDetail.purchase", "purchase")
      .where("purchase.userId = :userId", { userId: user.id })
      .andWhere("purchaseDetail.purchaseId = :purchaseId", { purchaseId })
      .getMany();
  }
}
