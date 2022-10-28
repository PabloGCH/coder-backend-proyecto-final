import express from "express";


var productsRouter = express.Router();

productsRouter.get("/greet", (req, res) => {
	res.send("hello from products");
})



export default productsRouter;
