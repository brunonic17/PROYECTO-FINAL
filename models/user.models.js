import mongoose from "mongoose"

mongoose.pluralize(null)

const collection = "users"

const userSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true, unique: true },
    password: { type: String, require: true }
},{
    timestamps: true
})

export default mongoose.model(collection, userSchema)