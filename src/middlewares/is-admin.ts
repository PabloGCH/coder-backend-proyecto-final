import express from "express";

let admin = true;

const isAdmin = (req:express.Request, res:express.Response, next :express.NextFunction) :void => {
	if(admin) {
		next();
	} else {
		res.send({response: "you need admin authentication to use this route", success: false});
	}
}

export default isAdmin;
