//Dependencies
import cluster from "cluster";
import os from "os";
import express from "express";
import dotenv from "dotenv";
dotenv.config()

//Route imports
//==========================================================

import path from "path";

//Interfaces
//==========================================================
//import { UserModel } from "./models/user-model-mongo";

//Config import
//==========================================================
import { Config } from "./config/config";
import { errorLogger, infoLogger, warningLogger } from "./services/logger.service";
import router from "./routes/router";
import { initMongoDb } from "./persistence/config/mongo.config";
import { SQLDatabaseConnection } from "./persistence/config/knex.config";



//Init variables
//==========================================================
const app = express();
const NUMBEROFCORES = os.cpus().length;

//Tools
//==========================================================
//Native config
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));



//ROUTER
app.use(router)

//DATABASE CONNECTIONS
initMongoDb(); //MONGO WILL ALWAYS BE CONNECTED, BECAUSE IT IS USED FOR AUTHENTICATION
if(Config.DATABASE_NAME === "SQLITE" || Config.DATABASE_NAME === "SQL")
    SQLDatabaseConnection.getInstance().connect(Config.DATABASE_NAME);

if(process.env.MODE == "CLUSTER" && cluster.isPrimary) {
	infoLogger.info("Server initialized on cluster mode")
	for(let i = 0; i < NUMBEROFCORES; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker, error) => {
		warningLogger.warn({
			message: `Subproccess with id ${worker.id} died and had to be run again`,
			error: error
		})
		cluster.fork();
	})
} else {
    Config.configServer(app);
	if(process.env.MODE == "FORK") {infoLogger.info("Server initialized on fork mode")}
	app.listen(process.env.PORT, () => {
		if(process.env.MODE == "CLUSTER") {infoLogger.info("New server initialized on port " + process.env.PORT)}
		if(process.env.MODE == "FORK") {infoLogger.info("Server listening on port " + process.env.PORT)}
	});
}




