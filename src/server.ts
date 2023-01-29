//Dependencies
//===========================================================
import express from "express";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

//Route imports
//==========================================================
import productsRouter from "./routes/products-routing";
import cartRouter from "./routes/cart-routing";
import siteRouter from "./routes/site-routing";
import path from "path";

//Interfaces
//==========================================================
import { UserModel } from "./models/user-model-mongo";
import authRouter from "./routes/auth-routing";

//Config import
//==========================================================
import { config } from "./config/config";

//Init variables
//==========================================================
const app = express();
const router = express.Router();

//Tools
//==========================================================
//Native config
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));
//Passport config
app.use(session({
	store: MongoStore.create({mongoUrl: config.mongo.ulr}),
	secret: "dfvartg4wfqR3EFRQ3",
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 10 // 1 segundo * 60 * 10 = 10 minutos
	}
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user :any,done)=>{
	done(null,user.id);
})
passport.deserializeUser((id, done)=>{
	UserModel.findById(id, (err:any, userFound :any) => {
		if(err) return done(err);
		return done(null, userFound);
	})
})

//Sub routers
//==========================================================
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);
app.use("/site", siteRouter);

app.listen(process.env.PORT, () => {
	console.log("Server listening on port " + process.env.PORT)
})



