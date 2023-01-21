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

//sub routers
app.use("/products", productsRouter);
app.use("/cart", cartRouter);




app.listen(4000, () => {
	console.log(process.env.DB_MONGO_url)
	console.log("Server listening on port 4000")
})



