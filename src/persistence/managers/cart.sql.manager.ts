import { SQLClient } from "../clients/sql.client";

export class CartSQLManager extends SQLClient {
    constructor(){
        super('carts');
    }
}
