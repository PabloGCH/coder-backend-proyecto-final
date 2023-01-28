import { error } from "console";
import mongoose from "mongoose";
import { productModel } from "../../models/product-model-mongo";
import { config } from "../../config/config";

//models
import Response from "../../models/response";
import Product from "../../models/product";

class ProductManager {
	constructor() {
		mongoose.connect(config.mongo.ulr||"").then(
			() => {
				console.log("DB connection successful")
			},
			err => {
				throw new Error("DB connection failed");
			}
		)
	}

	public async saveProduct(product :Product) :Promise<Response>{
		try {
			let errors :any[] = [];
			let newProduct = await productModel.create(product)
			return {response: {message: "product succesfully added", product: newProduct}, success: true};
		}
		catch(err) {
			return {response: err, success: false}
		}
	}
	public async getProductById(id :number|string) :Promise<Response>{
		try {
			let product = await productModel.findById(id);
			return {response: {message: "product retrieved",  product:product}, success: true};
		}
		catch(err) {
			return {response: err, success: false};
		}
	}
	public async getAll() :Promise<Response> {
		try {
			let products = await productModel.find({});
			return {response: {message: "products retrieved", products: products}, success: true};
		}
		catch(err) {
			return {response:err, success: false};
		}
	}
	public async deleteById(id:number|string) :Promise<Response>{
		try {
			let product = await productModel.findByIdAndDelete(id);
			return {response: "product succesfully deleted", success: false};
		}
		catch(err) {
			return {response: err, success: false};
		}
	}
	public async edit(product:Product, id:number|string) :Promise<Response> {
		try {
			let newProduct = await productModel.findByIdAndUpdate(id, product, {new: true});
			return {response: {message: "product edited with success", product: newProduct}, success: true};
		} 
		catch(err) {
			return {response: err, success: false};;
		}
	}
}

export default ProductManager;
