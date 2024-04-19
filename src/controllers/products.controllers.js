import SchemaProduct from "../models/products.models.js";

// Endpoint para obtener todos los productos
export const GetProducts = async (req, res) => {
  try {
    const Product = await SchemaProduct.find();

    res.status(200).send(Product);
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
};
