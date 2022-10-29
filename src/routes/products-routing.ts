import express from "express";
import path from "path";
import ProductManager from "../managers/product-manager";
import Response from "../models/response";

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

productsRouter.post("/", (req, res) => {
	productManager.saveProduct(req.body).then((result :Response) => {
		res.send(result.response);
	})
})

productsRouter.put("/:id", (req, res) => {
	let {id} = req.params;
	productManager.edit(req.body, id).then((result :Response) => {
		res.send(result.response);
	})
})

productsRouter.delete("/:id", (req, res) => {
	let {id} = req.params;
	productManager.deleteById(id).then((result :Response) => {
		res.send(result.response);
	})
})



export default productsRouter;
