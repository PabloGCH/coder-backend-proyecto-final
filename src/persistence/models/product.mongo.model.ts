import mongoose from "mongoose";
const collection = "products";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})
export const ProductMongoModel = mongoose.model(collection, schema);

