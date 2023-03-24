import { MongoClient } from "../clients/mongo.client";
import { CartMongoModel } from "../models/cart.mongo.model";

export class CartMongoManager extends MongoClient {
  constructor() {
    super(CartMongoModel);
  }
}
