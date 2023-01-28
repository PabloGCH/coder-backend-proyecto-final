import express from "express";
import path from "path";

const siteRouter = express.Router();


siteRouter.get("/home", (req, res) => {
	res.sendFile(path.join(__dirname, '../public/site/home', 'home.html'))
})

siteRouter.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, '../public/site/login', 'login.html'))
})

siteRouter.get("/register", (req, res) => {
	res.sendFile(path.join(__dirname, '../public/site/register', 'register.html'))
})

siteRouter.get("/cart", (req, res) => {
	res.sendFile(path.join(__dirname, '../public/site/cart', 'cart.html'))
})



export default siteRouter;
