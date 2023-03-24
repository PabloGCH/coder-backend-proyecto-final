import express from 'express';
import passport from "passport";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";
import { UserModel } from '../../persistence/models/user.mongo.model';

const createHash = (password :string) => {
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return hash;
}

export function configurePassport(app: express.Application) {
    //PASSPORT CONFIGURATION
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
    //REGISTER STRATEGY
    passport.use("signupStrategy", new passportLocal.Strategy(
        {
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                let body = req.body;
                let userFound = await UserModel.findOne({username: username});
                if(userFound) {
                    throw {message: "User already exists"};
                }
                const newUser = {
                    username: username,
                    password: createHash(password),
                    email: body.email,
                    phone: body.phone
                }
                let userCreated = await UserModel.create(newUser);
                return done(null, userCreated)
            } catch (error) {
                Object.assign(req, {error: error});
                return done(new Error());
            }
        }
    ));
}
