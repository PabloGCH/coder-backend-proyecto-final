import express from "express";
import path from "path";
import Response from "../models/response";
import CartManager from "../daos/carts/cart-mongo";
import Cart from "../models/cart";
import isAuthenticated from "../middlewares/is-authenticated";

//const CARTFILEDIR = path.join(__dirname, "../assets/carts.json");
//const PRODUCTFILEDIR = path.join(__dirname, "../assets/products.json");

//const cartManager :CartManager = new CartManager(CARTFILEDIR, PRODUCTFILEDIR);
const cartManager :CartManager = new CartManager();

var cartRouter = express.Router();



//Consigue un carrito activo, si no existe lo crea
cartRouter.post("/", isAuthenticated, (req:any, res) => {
	const userId = req.session.user.id;
	cartManager.getCart(userId).then((result :Response) => {
		res.send(result);
	})
});

cartRouter.put("/order/:id", isAuthenticated, (req:any, res) => {
	let {id} = req.params;
	let user = req.session.user
	cartManager.orderCart(id, user.username, user.phone).then((result :Response) => {
		res.send(result);
	})
})


cartRouter.delete("/:id", isAuthenticated, (req, res) => {
	let {id} = req.params;
	cartManager.deleteById(id).then((result :Response) => {
		res.send(result);
	})
});

cartRouter.get("/:id/products", isAuthenticated, (req, res) => {
	let {id} = req.params;
	cartManager.getProductsById(id).then((result :Response) => {
		res.send(result);
	})
});


cartRouter.post("/:id/products/:id_prod", isAuthenticated, (req, res) => {
	let {id, id_prod} = req.params;
	cartManager.addProduct(id, id_prod).then((result :Response) => {
		res.send(result);
	})
});


cartRouter.delete("/:id/products/:id_prod", isAuthenticated, (req, res) => {
	let {id, id_prod} = req.params;
	cartManager.removeProduct(id, id_prod).then((result :Response) => {
		res.send(result);
	})
});


export default cartRouter;
