import express from "express";
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user-model-mongo";
import { userInfo } from "os";
import User from "../models/user";

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
			console.log(newUser)
			UserModel.create(newUser, (err, userCreated) => {
				if(err) return done(err, userCreated, {message: "failed to register user"});
				Object.assign(req, {success: true,message: "User created"})
				return done(null, userCreated)
			})
		})
	}
));

authRouter.get("/logoff", (req :Request|any, res) => {
	req.logout((err :any) => {
		if(err) return res.send("failed to close session");
		req.session.destroy(() => {
			console.log(err);
		});
	})
});

authRouter.post("/register", passport.authenticate("signupStrategy", {
	failureRedirect: "/register",
	failureMessage: true
}), (req:any,res) => {
	res.send({success: req.success || false, message: req.message||""})
});

authRouter.post("/login", (req:any, res) => {
	const body = req.body;
	if(req.session.user) {
		res.send({message:"already logged"})
	} else if(body.username && body.password) {
		UserModel.findOne({username: body.username}, (err:any, userFound:any) => {
			if(err) {
				res.send(err)
			}
			if(userFound) {
				if(bcrypt.compareSync(body.password, userFound.password)) {
					req.session.user = {
						username: body.username,
						password: body.password
					}
					res.send({success: true, message: "Session initialized"})
				} else {
					res.send({success: false, message: "Invalid password"})
				}
			}
		})

	} else {
		res.send({success: false, message: "Invalid user inputs"})
	}
})

export default authRouter;
