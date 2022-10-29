import express from "express";
import path from "path";
import CartManager from "../managers/cart-manager";
import Response from "../models/response";

const CARTFILEDIR = path.join(__dirname, "../assets/products.json");
const PRODUCTFILEDIR = path.join(__dirname, "../assets/products.json");

const cartManager :CartManager = new CartManager(CARTFILEDIR, PRODUCTFILEDIR);

var cartRouter = express.Router();


cartRouter.post("/", (req, res) => {
	cartManager.createCart().then((result :Response) => {
		res.send(result);
	})
});


cartRouter.delete("/:id", (req, res) => {
	let {id} = req.params;
	cartManager.deleteById(id).then((result :Response) => {
		res.send(result);
	})
});

cartRouter.get("/:id/products", (req, res) => {
	let {id} = req.params;
	cartManager.getProductsById(id).then((result :Response) => {
		res.send(result);
	})
});


cartRouter.post("/:id/products/:id_prod", (req, res) => {
	let {id, id_prod} = req.params;
	cartManager.addProduct(id, id_prod).then((result :Response) => {
		res.send(result);
	})
});


cartRouter.delete("/:id/products/:id_prod", (req, res) => {
	let {id, id_prod} = req.params;
	cartManager.removeProduct(id, id_prod).then((result :Response) => {
		res.send(result);
	})
});


export default cartRouter;
