import ProductManager from "../daos/products/product-mongo"
import isAuthenticated from "../middlewares/is-authenticated";
import { Request, Response } from "express";
import HTTPResponse from "../models/response";
const productManager :ProductManager = new ProductManager();


export const getAllProducts = (req :Request, res :Response) => {
    productManager.getAll().then((result :HTTPResponse) => {
		res.send(result);
	})
}

export const getProductById = (req :Request, res :Response) => {
	let {id} = req.params;
	productManager.getProductById(id).then((result :HTTPResponse) => {
		res.send(result);
	})
}

export const saveProduct = (req :Request, res :Response) => {
	productManager.saveProduct(req.body).then((result :HTTPResponse) => {
		res.send(result);
	})
}

export const editProduct = (req :Request, res :Response) => {
	let {id} = req.params;
	productManager.edit(req.body, id).then((result :HTTPResponse) => {
		res.send(result);
	})
}

export const deleteProduct = (req :Request, res :Response) => {
	let {id} = req.params;
	productManager.deleteById(id).then((result :HTTPResponse) => {
		res.send(result);
	})
}



