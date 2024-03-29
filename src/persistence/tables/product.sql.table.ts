import { Knex } from "knex";

export const ProductSQLTable = (table :Knex.TableBuilder) =>{
    table.increments("id");
    table.string("name", 20);
    table.integer("price").nullable();
    table.string("imgURL", 1500);
    table.string("description", 1500);
    table.string("category", 20);
    table.timestamps(true, true);
}
