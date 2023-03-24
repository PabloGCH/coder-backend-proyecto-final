import mongoose from "mongoose";
const collection = "carts";
const schema = new mongoose.Schema({
    userId: {  
        type: String,
        required: true
    },
    products_ids: {
        type: [String],
        default: []
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

