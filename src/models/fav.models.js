import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "Favorites";

const favSchema = new mongoose.Schema(
  {
    productId: {type: mongoose.Types.ObjectId, ref: 'Product', required: true},
   
    user: { type: mongoose.Types.ObjectId, ref: "Users", require: true },
  },
  {
    timestamps: true,
  }
);

favSchema.pre()

export default mongoose.model(collection, favSchema);
