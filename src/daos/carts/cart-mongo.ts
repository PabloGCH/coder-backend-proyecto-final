import mongoose from "mongoose";

//models
import Response from "../../models/response";
import ProductManager from "../products/product-mongo";
import Cart from "../../models/cart";
import { cartModel } from "../../models/cart-model-mongo";
import { productModel } from "../../models/product-model-mongo";
import { config } from "../../config/config";
import CART_STATUS from "../../enums/cartStatus";




class CartManager {
	private productManager :ProductManager;

	constructor() {
		this.productManager = new ProductManager();
		mongoose.connect(config.mongo.ulr||"").then(
			() => {
				console.log("DB connection successful")
			},
			err => {
				throw new Error("DB connection failed");
			}
		)
	}

	public async getCart(userId :string) :Promise<Response>{
		try {
			let activeCart = await cartModel.findOne({userId: userId, status: CART_STATUS.ACTIVE});
			if(activeCart) {
				return {response: {message: "There is already an active cart for this user", cartId: activeCart._id}, success: true};
			} else {
				let cart:Cart = {
					products: [],
					userId: userId,
					status: CART_STATUS.ACTIVE
				};
				let newCart = await cartModel.create(cart)
				return {response: {message: "Cart succesfully created", cartId: newCart._id}, success: true};
			}
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

	public async orderCart(cartId :number|string) :Promise<Response> {
		try {
			let cart = await cartModel.findById(cartId);
			if(!cart) {
				throw "Cart does not exist";
			}
			if(cart.status != CART_STATUS.ACTIVE) {
				throw "Can't order a closed or pending cart";
			} 
			await cartModel.findByIdAndUpdate(cart._id, {status: CART_STATUS.PENDING});
			// EMAIL SHOULD BE SENT HERE !!!!!!!!!!!!!!
			return {response: "Cart order sent", success: true};;
		}
		catch(err) {
			return {response: err, success: false};;
		}
	}
}

export default CartManager;
