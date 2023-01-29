import express from "express";
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user-model-mongo";
import { userInfo } from "os";
import User from "../models/user";
import { config } from "dotenv";
import { mailClient } from "../mailer/mailer";


const authRouter = express.Router();

const createHash = (password :string) => {
	const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	return hash;
}

passport.use("signupStrategy", new passportLocal.Strategy(
	{
		passReqToCallback: true,
	},
	(req, username, password, done) => {
		UserModel.findOne({username: username}, (err:any, userFound:any) => {
			if(err) return done(err);
			if(userFound) {
				Object.assign(req, {success: false,message: "user already exists"})
				return done(null, userFound);
			}
			const newUser :User = req.body;
			newUser.password = createHash(newUser.password)
			UserModel.create(newUser, (err, userCreated) => {
				if(err) return done(err, userCreated, {message: "failed to register user"});
				Object.assign(req, {success: true, user: userCreated ,message: "User created"})
				return done(null, userCreated)
			})

		})
	}
));

authRouter.get("/logoff", (req :Request|any, res) => {
	req.logout((err :any) => {
		if(err) { return res.send({success: false, message:"failed to close session"})}
		else {
			req.session.destroy(() => {
				res.send({success: true, message: "logged off successfully"})
			});
		}
	})
});

authRouter.post("/register", passport.authenticate("signupStrategy", {
	failureRedirect: "/register",
	failureMessage: true
}), async (req:any,res) => {
	try {
		if(req.success) {
			//SEND MAIL TO ADMIN
			mailClient.sendMail({
				from: "server",
				to: process.env.ADMIN_MAIL,
				subject: "NEW USER",
				html: `
				<div>
				<h1>New user has registered</h1>
				<h2>User data: </h2>
				<p>Id: <span>${req.user._id}</span></p>
				<p>Name: <span>${req.user.username}</span></p>
				<p>Email: <span>${req.user.email}</span></p>
				<p>Address: <span>${req.user.address}</span></p>
				<p>Phone: <span>${req.user.phone}</span></p>
				</div>
				`
			});
			//SEND MESSAGE TO ADMIN
		}
		res.send({success: req.success || false, message: req.message||""})
	} catch(err) {
		res.send({success: false, message: err})
	}

});

authRouter.post("/login", (req:any, res) => {
	const body = req.body;
	if(req.session.user) {
		res.send({message:"already logged"})
	} else if(body.email && body.password) {
		UserModel.findOne({email: body.email}, (err:any, userFound:any) => {
			if(err) {
				res.send(err)
			}
			if(userFound) {
				if(bcrypt.compareSync(body.password, userFound.password)) {
					req.session.user = {
						id: userFound._id,
						username: userFound.username,
						password: userFound.password,
						phone: userFound.phone,
						email: userFound.email,
					}
					res.send({success: true, message: "Session initialized"})
				} else {
					res.send({success: false, message: "Invalid password"})
				}
			}
			res.send({success: false, message: "The user does not exist"})
		})

	} else {
		res.send({success: false, message: "Invalid user inputs"})
	}
});

export default authRouter;
