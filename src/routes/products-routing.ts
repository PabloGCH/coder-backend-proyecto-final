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



export default productsRouter;
