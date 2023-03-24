import express from "express";
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import { userInfo } from "os";
import { UserModel } from "../persistence/models/user.mongo.model";
import { config } from "dotenv";
import { mailClient } from "../mailer/mailer";
import { errorLogger } from "../services/logger.service";


const authRouter = express.Router();


authRouter.get("/logoff", (req :Request|any, res) => {
    try {
        req.logout((err :any) => {
            if(err) return res.send("failed to close session")
                req.session.destroy((err :any) => {
                    console.log(err);
                });
                res.send({success: true, message: "Logged off"});
        });
    }
    catch(err) {
        errorLogger.error({
            message: "Failed to close user session"
        })
        res.send({success: false, message: "Failed to log off"})
    }
});


const passportWrapper = (req :any, res :any, next :any) => {
    passport.authenticate("signupStrategy",{ session: false }, (err :any, user :any, info :any) => {
        if(err) {
            res.send({success: false, message: "Failed to register", error: req.error || "Unknown error"});
        } else {
            req.user = user;
            return next();
        }
    })(req, res, next);
}


authRouter.post("/register", passportWrapper, async (req:any,res) => {
    try {
        //TODO: MOVE THIS TO A SERVICE
        await mailClient.sendMail({
            from: "server",
            to: process.env.ADMIN_MAIL,
            subject: "NEW USER",
            html: `
            <div>
            <h1>New user has registered</h1>
            <h2>User data: </h2>
            <p>Id: <span>${req.user._id}</span></p>
            <p>Email: <span>${req.user.email}</span></p>
            </div>
            `
        });
        res.send({success: true, message: "User registered and mail sent to admin"});
    } catch(err) {
        errorLogger.error({
            message: "User registered but failed to send mail to admin",
            error: err
        })
        res.send({success: false, message: "User registered but failed to send mail to admin", error: err});
    }
});

authRouter.post("/login", (req:any, res) => {
    try {
        const body = req.body;
        if(req.session.user) {
            res.send({success: false, message:"already logged"})
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
    }
    catch(err) {
        errorLogger.error({
            message: "Failed to login user",
            error: err
        })
        res.send({success: false, message: "Failed to login user"})
    }

});

export default authRouter;
