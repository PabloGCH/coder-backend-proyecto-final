import express from "express";


var cartRouter = express.Router();

cartRouter.get("/greet", (req, res) => {
	res.send("hello from cart");
})



export default cartRouter;
