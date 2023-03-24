import { MANAGERTYPE } from "./enums/managerType.enum";
import { ProductSQLManager } from "./managers/product.sql.manager";
import { sqliteconfig } from "./config/sqliteconfig";
import { ProductMongoManager } from "./managers/product.mongo.manager";
import { DbClient } from "./dbclient";
import { infoLogger } from "../services/logger.service";
import knex, { Knex } from "knex";
import { args } from "../config/minimist/minimist.config";
import { CartMongoManager } from "./managers/cart.mongo.manager";
import { CartSQLManager } from "./managers/cart.sql.manager";


const database :Knex | null = args.d == "SQLITE" ? knex(sqliteconfig) : null;


export const createManager = (managerType :number) :DbClient|null => {
    if(managerType === MANAGERTYPE.PRODUCTS) {
        if(args.d === "MONGO") {
            infoLogger.info({message: "Creating a new manager", type: "product", db: "mongo"});
            return new ProductMongoManager;
        }
        if(args.d === "SQLITE" && database) {
            infoLogger.info({message: "Creating a new manager", type: "product", db: "sqlite"});
            return new ProductSQLManager;
        }
    }
    if(managerType === MANAGERTYPE.CARTS) {
        if(args.d === "MONGO") {
            infoLogger.info({message: "Creating a new manager", type: "carts", db: "mongo"});
            return new CartMongoManager;
        }
        if(args.d === "SQLITE" && database) {
            infoLogger.info({message: "Creating a new manager", type: "carts", db: "sqlite"});
            return new CartSQLManager;
        }
    }
    return null;
}
