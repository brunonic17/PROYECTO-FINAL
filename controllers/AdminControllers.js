import Products from "../models/admin.models.js";

export const GetProducts = async (req, res) => {
  const products = await Products.find({
   user: req.user.id
  });
  console.log(req.user.id)
  res.send({ data: products });
};

export const CreateProducts = async (req, res) => {
  try {
    const {
      IdProduct,
      NombreProducto,
      Precio,
      Descripcion,
      Talle,
      Categoria,
      Stock
    } = req.body;
    console.log(req.user)

    const NewProduct = new Products({
      IdProduct,
      NombreProducto,
      Precio,
      Descripcion,
      Talle,
      Categoria,
      Stock,
      user: req.user.id
    });

    const ProductSaved = await NewProduct.save();

    res.status(200).send({ status: "OK", data: ProductSaved });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message, ok: "error" });
  }
};

export const GetProduct = async (req, res) => {
  const product = await Products.findById(req.params.id);
  console.log("estoy aca")
  if (!product) return res.status(404).send("No se encontro el producto");

  res.send({ data: product });
};

export const DeleteProducts = async (req, res) => {
  const product = await Products.findByIdAndDelete(req.params.id);
  if (!product) return res.status(400).send("No se encontro el producto");

  return res.sendStatus(204);
};
export const PutProducts = async (req, res) => {
  const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) return res.status(400).send("No se encontro el producto");

  res.send({ data: product });
};
