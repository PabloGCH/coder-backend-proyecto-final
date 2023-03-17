import express from "express";
import path from "path";
//import ProductManager from "../daos/products/product-fs";
import ProductManager from "../daos/products/product-mongo"
import Response from "../models/response";
import isAuthenticated from "../middlewares/is-authenticated";

//const PRODUCTFILEDIR = path.join(__dirname, "../assets/products.json");
//const productManager :ProductManager = new ProductManager(PRODUCTFILEDIR);
const productManager :ProductManager = new ProductManager();
const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
	productManager.getAll().then((result :Response) => {
		res.send(result);
	})
})

productsRouter.get("/:id", (req, res) => {
	let {id} = req.params;
	productManager.getProductById(id).then((result :Response) => {
		res.send(result);
	})
})

productsRouter.post("/", isAuthenticated, (req, res) => {
	productManager.saveProduct(req.body).then((result :Response) => {
		res.send(result);
	})
})

productsRouter.put("/:id", isAuthenticated, (req, res) => {
	let {id} = req.params;
	productManager.edit(req.body, id).then((result :Response) => {
		res.send(result);
	})
})

productsRouter.delete("/:id", isAuthenticated, (req, res) => {
	let {id} = req.params;
	productManager.deleteById(id).then((result :Response) => {
		res.send(result);
	})
})



export default productsRouter;