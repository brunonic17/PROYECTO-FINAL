import Shoppings from "../models/shopping.models.js";
import Products from "../models/product.model.js";


//BUSCA SI EXISTE CARRITO DEL USUARIO Y LO LISTA
async function GetProduct(req, res) {
  try {
    const { IdUsu } = req.body;
    const Carro = await Shoppings.findOne({ IdUsu: IdUsu });
    if (Carro) {
      res.status(200).send({ status: "OK", data: Carro });
    } else {
      res
        .status(500)
        .send({ status: "ERR", data: "No Existe Carrito para este Usuario" });
    }
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

//CREA UN CARRITO DE CERO PARA UN USUARIO, PONIENDO EL PRIMER ARTICULO QUE HAYA SELECCIONADO
async function PostProduct(req, res) {
  try {
    const {IdUsu, CantProduct, FechaCarro, 
      TipoPagoCarro, pid
    } = req.body;
    
        
      const newCarrito = await Shoppings.create({IdUsu, FechaCarro,TipoPagoCarro });
      const Product = await Products.findOne({_id:pid });
      
      // let Precio  = Product.price;
      // let Producto = CantProduct * Precio;
      let ParcialProduct = Product.price * CantProduct
     

      newCarrito.DetalleCarro.push({
        pid,
        CantProduct,
        ParcialProduct 
      });

      await newCarrito.save();

      return res.status(200).json({
      ok: true,
      data: newCarrito,
      });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

//PARA AGREGAR ARTICULOS AL CARRITO EXISTENTE DE UN USUARIO
async function PushProduct(req, res) {
  try {

      const {CantProduct, pid, cid } = req.body;
      const process = await Shoppings.updateOne(
          { _id: cid, 'DetalleCarro.pid': pid },
          { $set: { 'DetalleCarro.$.CantProduct': CantProduct } },
          { arrayFilters: [{ 'DetalleCarro.pid': pid }] }
      );

      if (process.matchedCount === 0 || process.modifiedCount === 0) {
          // Si ingresa, es porque el id de producto no existe en el array, se agrega nuevo
          return await Shoppings.updateOne(
              { _id: cid },
              { $push: { DetalleCarro: { pid, CantProduct } } }
          );
      } else {
          return process;
      };
    } catch (err) {
      res.status(500).send({ status: "ERR", data: err.message });
    }
 
}

//PARA MODFICAR ARTICULOS AL CARRITO EXISTENTE DE UN USUARIO
async function PatchProduct(req, res) {
  try {
    const {IdUsu, IdProduct, CantProduct, FechaCarro,
      TipoPagoCarro,
    } = req.body;

    const newCarrito = await Shoppings.updateOne(
      {
    });

    newCarrito.DetalleCarro.push({
      IdArtCarro: IdProduct,
      IdProdCarro: CodProdVenta,
      DescArtCarro: NombreProducto,
      ImgCarro: UrlImage,
      ColorCarro: Color,
      TalleCarro: Talle,
      PcioCarro: Precio,
      CantCarro: CantProduct,
      ParcialCarro: Precio * CantProduct,
    });

    await newCarrito.save();

    return res.status(200).json({
      ok: true,
      data: newCarrito,
    });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}


export { GetProduct, PostProduct, PatchProduct, PushProduct};
