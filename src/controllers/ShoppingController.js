import Shoppings from "../models/shopping.models.js";
let tot = 0
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

async function PostProduct(req, res) {
  try {
    const {IdUsu, IdProduct, CodProdVenta, NombreProducto, UrlImage, Color, Precio, CantProduct, Talle, FechaCarro,
      TipoPagoCarro,
    } = req.body;

    const newCarrito = await Shoppings.create({IdUsu, FechaCarro, TotalCarro: Precio * CantProduct,
      TipoPagoCarro,
      DetalleCarrito: [],
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

async function PatchProduct(req, res) {
  try {
    const {
      IdUsu,
      // IdProduct,
      // CodProdVenta,
      // NombreProducto,
      // UrlImage,
      // Color,
      Precio,
      CantProduct,
      // Talle,
    } = req.body;
    
    const Carro = await Shoppings.findOne({ IdUsu: IdUsu });

    if (Carro) {
      tot = await Shoppings.TotalCarro;
      const Carrito = await Shoppings.findOneAndUpdate({IdUsu: IdUsu }, {TotalCarro: tot + (Precio * CantProduct)})
      res.status(200).send({ status: "OK", data: Carrito });

      // res.status(200).send({ status: "OK", data: Carro });
      
      // await Shoppings.update({TotalCarro: TotalCarro+(Precio * CantProduct)

      // });
  
      // newCarrito.DetalleCarro.push({
      //   IdArtCarro: IdProduct,
      //   IdProdCarro: CodProdVenta,
      //   DescArtCarro: NombreProducto,
      //   ImgCarro: UrlImage,
      //   ColorCarro: Color,
      //   TalleCarro: Talle,
      //   PcioCarro: Precio,
      //   CantCarro: CantProduct,
      //   ParcialCarro: Precio * CantProduct,
      // });
  
      // await newCarrito.save();
  
      // return res.status(200).json({
      //   ok: true,
      //   // data: newCarrito,
      // });  
      // await Shoppings.DetalleCarro.update({ "IdUsu" : IdUsu},
      //                   { $addToSet:
      //                   { "DetalleCarro" :
      //                   { $each: [{"IdArtCarro": IdProduct,
      //                     "IdProdCarro": CodProdVenta,
      //                     "DescArtCarro": NombreProducto}]
      //                   }
      //                   }
      //                   }
      //                   );
      //await newCarrito.save();
      //return res.status(200).json({
     //   ok: true,
        // data: newCarrito,
    //  });

    } else {
      res
        .status(500)
        .send({ status: "ERR", data: "No Existe Carrito para este Usuario en Post" });
    }

    
    

  } catch (err) {
    res.status(500).send({ status: `ERR ${tot}`, data: err.message });
  }
}

export { GetProduct, PostProduct, PatchProduct };
