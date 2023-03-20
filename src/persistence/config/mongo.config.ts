import mongoose from "mongoose";
import { infoLogger } from "../../services/logger.service";

export function initMongoDb() {
    //CONNECTS TO MONGO
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_MONGO_URL||"").then(
        () => {
            infoLogger.info("Connected to MongoDB");
        },
        err => {
            console.log(err)
        }
    )
}
