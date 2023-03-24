import mongoose from "mongoose";
const collection = "carts";
const schema = new mongoose.Schema({
    userId: { //User that owns the cart
        type: String,
        required: true
    },
    productIDs: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
export const CartMongoModel = mongoose.model(collection, schema);

