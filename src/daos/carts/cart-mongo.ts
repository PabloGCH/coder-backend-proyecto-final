import mongoose from "mongoose";

//models
import Response from "../../models/response";
import ProductManager from "../products/product-mongo";
import { Cart, cartModel } from "../../models/cart-model-mongo";
import { productModel } from "../../models/product-model-mongo";
import { config } from "../../config/config";

class CartManager {
	private productManager :ProductManager;

	constructor() {
		this.productManager = new ProductManager();
		mongoose.connect(config.mongo.ulr||"").then(
			() => {
				console.log("connection successful")
			},
			err => {
				throw new Error("connection failed");
			}
		)
	}

	public async createCart() :Promise<Response>{
		try {
			let cart:Cart = {
				products: []
			};
			let newCart = await cartModel.create(cart)
			return {response: {message: "cart succesfully created", cartId: newCart._id}, success: true};
		}
		catch(err) {
			return {response: err, success: false}
		}
	}
	public async getProductsById(id :number|string) :Promise<Response>{
		try {
			let cart = await cartModel.findById(id);
			let productIds :string[] = cart?.products || [];
			let products  = await productModel.find({
				_id: {
					$in: productIds
				}
			});
			return {response: {message: "products retrieved",  products: products}, success: true};
		}
		catch(err) {
			return {response: err, success: false};
		}
	}

	public async deleteById(id:number|string) :Promise<Response>{
		try {
			let cart = await cartModel.findByIdAndDelete(id);
			return {response: "cart succesfully deleted", success: false};
		}
		catch(err) {
			return {response: err, success: false};
		}
	}

	public async addProduct(cartId :number|string, productId :number|string) :Promise<Response> {
		try {
			let cart = await cartModel.findByIdAndUpdate(cartId, {$push: {products: productId}})
			return {response: "product added to cart with success", success: true};
		} 
		catch(err) {
			return {response: err, success: false};;
		}
	}


	public async removeProduct(cartId :number|string, productId :number|string) :Promise<Response> {
		try {
			let cart = await cartModel.findByIdAndUpdate(cartId, {$pull: {products: {$eq: productId}}})
			return {response: "product removed from cart with success", success: true};
		} 
		catch(err) {
			return {response: err, success: false};;
		}
	}
}

export default CartManager;
