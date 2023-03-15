import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as cookieParser from "cookie-parser";
import config from "../ormconfig";
import { AuthModule } from "./auth/auth.module";
import { BrandModule } from "./brand/brand.module";
import { CartModule } from "./cart/cart.module";
import { CategoryModule } from "./category/category.module";
import { ColorModule } from "./color/color.module";
import { CommentModule } from "./comment/comment.module";
import { redisConfig } from "./config/redis-config";
import { InventoryModule } from "./inventory/inventory.module";
import { ProductModule } from "./product/client/product.module";
import { PurchaseModule } from "./purchase/purchase.module";
import { RedisModule } from "./redis/redis.module";
import { SizeModule } from "./size/size.module";
import { UserModule } from "./user/client/user.module";
import { UtilsModule } from "./utils/utils.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...config, autoLoadEntities: true }),
    RedisModule.register(redisConfig),
    UtilsModule.register(),
    AuthModule,
    BrandModule,
    CommentModule,
    ProductModule,
    BrandModule,
    CategoryModule,
    CommentModule,
    ColorModule,
    SizeModule,
    CartModule,
    InventoryModule,
    PurchaseModule,
    UserModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(comsumer: MiddlewareConsumer) {
    // Use cookie middleware
    comsumer.apply(cookieParser()).forRoutes("*");
  }
}
