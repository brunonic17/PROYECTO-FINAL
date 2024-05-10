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
export const productCard = async (req, res) => {
  console.log(req.params.id)
  try {
    const product = await SchemaProduct.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "producto no encontrado" });
    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};