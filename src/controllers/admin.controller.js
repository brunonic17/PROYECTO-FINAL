async function CreateProducts(req, res) {
  try {
    const { IdProduct,NombreProducto,Precio,Detalle,UltimoPrecio,Categoria}= req.body;

    
    const NewProduct = await SchemaProduct.create({
      IdProduct,
      NombreProducto,
      Precio,
      Detalle,
      UltimoPrecio,
      Categoria,
      Especificaciones: [],
    });

    if (NewProduct) {
      res.status(200).send({ status: "OK", data: NewProduct });
    }
    // }
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}