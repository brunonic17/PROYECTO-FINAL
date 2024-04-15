import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "ProductsFake";

const userSchema = new mongoose.Schema(
  {
    id:{type: Number},
    title: {type: String},
    category:{type: String},
    description:{  type:String },
    image:{ type: String} ,
    price: { type: Number },
    }
);

export default mongoose.model(collection, userSchema);