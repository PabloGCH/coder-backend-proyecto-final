import express from "express";
import path from "path";
import ProductManager from "../daos/products/product-fs";
import Response from "../models/response";
import isAdmin from "../middlewares/is-admin";

const PRODUCTFILEDIR = path.join(__dirname, "../assets/products.json");
const productManager :ProductManager = new ProductManager(PRODUCTFILEDIR);

var productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
	productManager.getAll().then((result :Response) => {
		res.send(result.response);
	})
})

productsRouter.get("/:id", (req, res) => {
	let {id} = req.params;
	productManager.getProductById(id).then((result :Response) => {
		res.send(result.response);
	})
})

productsRouter.post("/", isAdmin, (req, res) => {
	productManager.saveProduct(req.body).then((result :Response) => {
		res.send(result.response);
	})
})

productsRouter.put("/:id", isAdmin, (req, res) => {
	let {id} = req.params;
	productManager.edit(req.body, id).then((result :Response) => {
		res.send(result.response);
	})
})

productsRouter.delete("/:id", isAdmin, (req, res) => {
	let {id} = req.params;
	productManager.deleteById(id).then((result :Response) => {
		res.send(result.response);
	})
})



export default productsRouter;
