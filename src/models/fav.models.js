import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "Favorites";

const favSchema = new mongoose.Schema(
  {
    productId: { type: String, require: [true, "EL product es requerido"] },
    description: { type: String, require: [true, "La descripcion es requerido"] },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Types.ObjectId, ref: "Users", require: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(collection, favSchema);
