import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});


export const UserModel = mongoose.model(userCollection, userSchema);
