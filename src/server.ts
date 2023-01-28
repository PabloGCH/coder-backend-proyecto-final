//dependencies
import express from "express";

//routes imports
import productsRouter from "./routes/products-routing";
import cartRouter from "./routes/cart-routing";
import siteRouter from "./routes/site-routing";
import path from "path";

//init variables
const app = express();
const router = express.Router();
//tools
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//Sub routers
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/site", siteRouter);

app.listen(process.env.PORT, () => {
	console.log("Server listening on port " + process.env.PORT)
})



