import { Knex } from "knex";

export const CartSQLTable = (table :Knex.TableBuilder) =>{
    table.increments("id");
    table.string("userId", 30);
    table.integer("status");
    table.timestamps(true, true);
}
