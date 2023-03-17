import express from "express";
import { deleteProduct, editProduct, getAllProducts, getProductById, saveProduct } from "../controllers/products.controller";
import isAuthenticated from "../middlewares/is-authenticated";
const productsRouter = express.Router();



productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", isAuthenticated, saveProduct);
productsRouter.put("/:id", isAuthenticated, editProduct);
productsRouter.delete("/:id", isAuthenticated, deleteProduct);



export default productsRouter;
