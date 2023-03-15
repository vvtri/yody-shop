import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

// When run migration, dotenv do not load, so must load again
import * as dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
dotenv.config();

let config: PostgresConnectionOptions & ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["dist/**/*.entity.js"],
  // synchronize: false,
  synchronize: false,
  migrationsRun: false,
  migrations: ["dist/src/migrations/*.js"],
  cli: { migrationsDir: "src/migrations" },
  // logging: true,
};

switch (process.env.NODE_ENV) {
  case "production":
    config = {
      ...config,
      synchronize: false,
    };
    break;

  default:
    break;
}

export default config;

// UserPermission,
//     User,
//     UserVerification,
//     UserResetPassword,
//     UserAvatar,
//     Brand,
//     Category,
//     Product,
//     Cart,
//     ProductVariation,
//     Color,
//     Comment,
//     Inventory,
//     Product,
//     ProductRating,
//     ProductImage,
//     Purchase,
//     PurchaseDetail,
// 		Size
