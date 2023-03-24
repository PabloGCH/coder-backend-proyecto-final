import express from "express";
import productsRouter from "./products.routing";
//import cartRouter from "./carts.routing";
import authRouter from "./auth.routing";

const router = express.Router();

router.use("/api/products", productsRouter);
router.use("/api/auth", authRouter);
//router.use("/api/cart", cartRouter);


export default router;
