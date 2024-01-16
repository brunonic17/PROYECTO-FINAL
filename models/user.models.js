import mongoose from "mongoose"

mongoose.pluralize(null)

const collection = "users"

const userSchema = new mongoose.Schema({
    nameUser: String,
    email: String,
    password: String,
    rule: {type: String, default: "user"}
},{
    timestamps: true
})

export default mongoose.model(collection, userSchema)