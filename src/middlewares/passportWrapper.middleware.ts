import passport from "passport";

export const passportWrapper = (req :any, res :any, next :any) => {
    passport.authenticate("signupStrategy",{ session: false }, (err :any, user :any, info :any) => {
        if(err) {
            res.send({success: false, message: "Failed to register", error: req.error || "Unknown error"});
        } else {
            req.user = user;
            return next();
        }
    })(req, res, next);
}
