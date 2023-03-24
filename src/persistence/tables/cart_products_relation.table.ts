import { Knex } from "knex";

export const CartProductsSQLTable = (table :Knex.TableBuilder) =>{
    table.increments("id");
    table.integer("carts_id").unsigned().notNullable();
    table.integer("products_id").unsigned().notNullable();
}
