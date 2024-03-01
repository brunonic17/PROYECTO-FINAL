import mongoose from "mongoose"

mongoose.pluralize(null)

const collection = "Users"

const userSchema = new mongoose.Schema({
    nameUser: String,
    email: String,
    password: String,
    rule: {type: String, default: "user"},
    carrito: { type: mongoose.Types.ObjectId,
    ref: "Shoppings" }
},{
    timestamps: true
})

export default mongoose.model(collection, userSchema)