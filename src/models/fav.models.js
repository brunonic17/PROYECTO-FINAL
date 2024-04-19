
import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "Favorites";

const favSchema = new mongoose.Schema(
  {
    product: {type: Object, require: true},
    // productIdFav: {type: mongoose.Types.ObjectId, ref: 'Products',required: true},
    user: { type: mongoose.Types.ObjectId, ref: "Users", require: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(collection, favSchema);
