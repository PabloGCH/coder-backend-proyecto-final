import express from "express";
import path from "path";
import isAuthenticated from "../middlewares/is-authenticated";
import { addProductToCart, getCart, orderCart, removeProductFromCart } from "../controllers/carts.controller";

//const CARTFILEDIR = path.join(__dirname, "../assets/carts.json");
//const PRODUCTFILEDIR = path.join(__dirname, "../assets/products.json");

//const cartManager :CartManager = new CartManager(CARTFILEDIR, PRODUCTFILEDIR);
var cartRouter = express.Router();

cartRouter.post("/", isAuthenticated, getCart);
cartRouter.patch("/products/add/:cartid/:productid", isAuthenticated, addProductToCart);
cartRouter.patch("/products/remove/:cartid/:productid", isAuthenticated, removeProductFromCart);
cartRouter.patch("/order/:cartid", isAuthenticated, orderCart);

export default cartRouter;
