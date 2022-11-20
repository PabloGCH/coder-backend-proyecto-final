import mongoose from "mongoose";
const cartCollection = "carts";
const cartSchema = new mongoose.Schema({
	products: {type: Array},
}, {timestamps: true});
export const cartModel = mongoose.model(cartCollection, cartSchema);
export interface Cart {
	products ?:string[]  //Array de ids de products
}

