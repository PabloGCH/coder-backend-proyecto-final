import express from "express";
import path from "path";
import Response from "../models/response";
import CartManager from "../daos/carts/cart-mongo";
import Cart from "../models/cart";

//const CARTFILEDIR = path.join(__dirname, "../assets/carts.json");
//const PRODUCTFILEDIR = path.join(__dirname, "../assets/products.json");

//const cartManager :CartManager = new CartManager(CARTFILEDIR, PRODUCTFILEDIR);
const cartManager :CartManager = new CartManager();

var cartRouter = express.Router();



//Consigue un carrito activo, si no existe lo crea
cartRouter.post("/", (req:any, res) => {
	const userId = req.session.user.id;
	if(userId) {
		cartManager.getCart(userId).then((result :Response) => {
			res.send(result);
		})
	} else {
		res.send({success: false, message: "Must be logged in"});
	}

});

cartRouter.put("/order/:id", (req:any, res) => {
	let {id} = req.params;
	cartManager.orderCart(id, req.session.user.username).then((result :Response) => {
		res.send(result);
	})
})


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
