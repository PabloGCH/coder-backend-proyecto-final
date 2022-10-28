//dependencies
import express from "express";

//routes imports
import productsRouter from "./routes/products-routing";
import cartRouter from "./routes/cart-routing";

//init variables
const app = express();
const router = express.Router();

//tools
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/public", express.static("public"))



//sub routers
app.use("/products", productsRouter);
app.use("/cart", cartRouter);




app.listen(4000, () => {
	console.log("Server listening on port 4000")
})



