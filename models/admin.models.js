import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "Productss";

const SchemaPoduct = new mongoose.Schema({
  IdProduct: { type: "number" },
  NombreProducto: { type: "String", required: true },
  Precio: { type: "number", required: true },
  Descripcion: { type: "String", default: "0" },
  Talle: { type: "String", default: "0" },
  Categoria: { type: "String", required: true },
  UrlImag: { type: "String", default: "sin imagen" },
  Stock: { type: "number", default: "0" },
  Date: {
    type: Date, default: Date.now
  },
  user:  {type : mongoose.Schema.Types.ObjectId , ref : 'Users'}
   
},
{
  timestamps: true
 });

export default mongoose.model(collection, SchemaPoduct);

// IdProduct: 
// NombreProducto:
// Precio:
// Descripcion:
// Talle:
// Categoria:
// Stock: