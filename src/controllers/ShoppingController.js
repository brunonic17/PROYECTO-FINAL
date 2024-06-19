import Shoppings from "../models/shopping.models.js";
import Pay from "../models/Pay.models.js";
import SchemaPago from "../models/shopping.Pago.js";
import SchemaProduct from "../models/ProductModel.js";
import Especificaciones from "../models/EspecifcacionesModel1.js";
import SchemaShoppings from "../models/shopping.models.js";

//BUSCA SI EXISTE CARRITO DEL USUARIO Y LO LISTA-
export const GetProductShoping = async (req, res) => {
  try {
    const ShoppingSave = await SchemaShoppings.find({IdUsu: req.user.id});
    (ShoppingSave.length === 0) ? res.status(200).json({message: "carrito vacio"})
    // console.log(IdUsu);
    : res.status(200).json(ShoppingSave);
    console.log(ShoppingSave)
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};
// async function GetProductShoping(req, res) { //usar
//   try {
//     const {id} = req.params;
//     // const Cart = await Shoppings.findById(id);
//     const Cart = await Shoppings.find();

//     let Band = "Su Carrito Actualizado"
//     if (Cart) {
//       const cid=Cart._id

//       const BackCart = Cart.DetalleCarro
//       console.log(BackCart);
//       // let Total=Cart.TotalCarro;
//       for (let i = 0; i < BackCart.length; i++) {//B
//         const element = BackCart[i];
//         console.log(element);
//         const Product = await SchemaProduct.findOne({_id:element.pid});
//         const Especi = await Especificaciones.findById(element.eid);
//         if (Especi.Stock < element.CantProduct) {
//           Band = "Se Actualizaron Productos en el Carrito por Falta de Stock"
//           element.CantProduct = Especi.Stock
//         }
//       }
//       Cart.DetalleCarro = BackCart.filter(element => element.CantProduct != 0)

//       const modifica= await Shoppings.updateOne(
//         {  _id: id },
//         {DetalleCarro: Cart.DetalleCarro },
//         )

//       res.status(200).json({ status: "OK", data: Band, Cart });

//     } else {
//       res
//         .status(500)
//         .send({ status: "ERR", data: "CUIDADO No Existe Carrito para este Usuario" });

//     }

//   } catch (err) {
//     res.status(500).send({ status: "ERR", data: err.message });
//   }
// }

async function GetShopingByIdUsu(req, res) {
  try {
    const Cart = await Shoppings.findOne({ IdUsu: req.body.IdUsu });

    if (Cart) {
      res.status(200).json({ status: "OK", data: Cart });
    } else {
      res.status(500).send({
        status: "ERR",
        data: "CUIDADO No Existe Carrito para este Usuario",
      });
    }
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

//CREA - AGREGA PRODUCTOS - MODIFICA LA CANTIDAD DE UN PRODUCTO EN UN CARRITO PARA UN USUARIO
async function PostProduct(req, res) {
  try {
    console.log(req.body);
    const Parametros = {
      IdUsu: req.body.IdUsu,
      CantProduct: req.body.cantidad,
      FechaCarro: req.body.FechaCarro,
      IdProduct: req.body.IdProduct,
      eid: req.body.eid,
    };
    const IdUsu = Parametros.IdUsu;
    const CantProduct = Parametros.CantProduct;
    const FechaCarro = Parametros.FechaCarro;
    const IdProduct = Parametros.IdProduct;
    const eid = Parametros.eid;
    console.log(CantProduct);
    const Cart = await Shoppings.findOne({ IdUsu: IdUsu });
    const Product = await SchemaProduct.findOne({ IdProduct: IdProduct });
    const Especi = await Especificaciones.findById(eid);
    console.log(Especi);
    const pid = Product._id;
    const IdArtCarro = Especi.CodArt;
    // CONSULTO SI EL STOCK ES SUFICIENTE PARA LA CANTIDAD INGRESADA
    if (Especi.Stock >= CantProduct) {
      // STOCK SUFICIENTE
      const IdProductCarro = IdProduct;

      // PREGUNTO SI EXISTE UN CARRITO PARA EL USUARIO
      if (Cart) {
        // PARA AGREGAR O MODIFICAR ARTICULOS EN EL CARRITO EXISTENTE DE UN USUARIO
        const cid = Cart._id;
        const CC = Cart.DetalleCarro.find((elemento) => {
          return elemento.eid._id == eid;
        });
        //BUSCO SI YA EXISTE EL ARTICULO EN EL CARRITO
        if (CC != undefined) {
          //MODIFICA LA CANTIDAD DEL ARTICULO EXISTENTE EN EL CARRITO

          const modific = await Shoppings.updateOne(
            { _id: cid, "DetalleCarro._id": CC._id },
            { $set: { "DetalleCarro.$.CantProduct": CantProduct } },
            { arrayFilters: [{ "DetalleCarro.pid": pid }] }
          );
          res
            .status(200)
            .send({ status: "ok", data: await Shoppings.findById(cid) });
        } else {
          //NO EXISTE EL ARTICULO - AGREGA EL ARTICULO EN EL CARRITO

          const modific = await Shoppings.updateOne(
            { _id: cid },
            {
              $push: {
                DetalleCarro: {
                  pid,
                  eid,
                  IdProductCarro,
                  IdArtCarro,
                  CantProduct,
                },
              },
            }
          );
          res
            .status(200)
            .send({ status: "ok", data: await Shoppings.findById(cid) });
        }
      } else {
        // CREA EL CARRITO PONIENDO EL PRIMER ARTICULO SELECCIONADO

        const modific = await Shoppings.create({ IdUsu, FechaCarro });
        modific.DetalleCarro.push({
          pid,
          eid,
          IdProductCarro,
          IdArtCarro,
          CantProduct,
        });

        await modific.save();

        return res.status(200).send({ status: "ok", data: modific });
      }
    } else {
      res
        .status(500)
        .send({ status: "err", data: "Cantidad Superior a la Existencia" });
    }
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err });
  }
}

// PARA AGREGAR ARTICULOS AL CARRITO EXISTENTE DE UN USUARIO
async function PushProduct(req, res) {
  //   try {
  //       const {CantProduct, IdProduct, IdUsu} = req.body;
  //           const Product = await Products.findOne({IdProduct:IdProduct });
  //           const pid = Product._id;
  //           const IdProductCarro = Product.IdProduct;
  //           if (Product.Stock > CantProduct) {
  //             const ParcialProduct = Product.Precio * CantProduct;
  //             const Cart = await Shoppings.findOne({IdUsu:IdUsu});
  //             const cid = Cart._id;
  //             const CC = Cart.DetalleCarro.find(elemento => {return elemento.IdProductCarro == IdProduct});
  //             if(CC!=undefined){
  //               let Total=Cart.TotalCarro-CC.ParcialProduct+ParcialProduct;
  //               const modific= await Shoppings.updateOne(
  //                 { _id:cid, 'DetalleCarro.pid': pid },
  //                 { TotalCarro:Total, $set: { 'DetalleCarro.$.ParcialProduct':ParcialProduct,'DetalleCarro.$.CantProduct':CantProduct} },
  //                 { arrayFilters: [{ 'DetalleCarro.pid': pid }] }
  //               );
  //               res.status(200).send({status:'ok', data: "Se Modifico el Articulo" })
  //             }else{
  //               let Total=Cart.TotalCarro+ParcialProduct;
  //               const modifica= await Shoppings.updateOne(
  //               { _id: cid },
  //               { TotalCarro:Total,
  //                 $push: { DetalleCarro: { pid, CantProduct,ParcialProduct, IdProductCarro } } }
  //               );
  //               res.status(200).send({status:'ok', data: "se agrego" })
  //             }
  //           } else {
  //             res
  //             .status(500)
  //             .send({ status: "ERR", data: "Cantidad Superior a la Existencia" });
  //           }
  //     } catch (err) {
  //       res.status(500).send({ status: "ERR", data: err.message });
  //     }}
  // //PARA ELIMINAR UN ARTICULO DE UN CARRITO EXISTENTE
  // async function DeleteProduct(req, res) {
  //   try {
  //     const {pid, IdUsu} = req.body;
  //           const Cart = await Shoppings.findOne({IdUsu:IdUsu});
  //           const cid = Cart._id;
  //           const CC = Cart.DetalleCarro.find(elemento => {return elemento.pid == pid});
  //           let Total=Cart.TotalCarro-CC.ParcialProduct;
  //           const modifica= await Shoppings.updateOne(
  //             { _id: cid , "DetalleCarro.pid":pid},
  //             { TotalCarro:Total, $pull: { DetalleCarro: { pid} }},
  //             { arrayFilters: [{ 'DetalleCarro.pid': pid }] })
  //             res.status(200).send({status:'ok', data: "Se Elmino el Articulo del Carrito" })
  //   } catch (err) {
  //     res.status(500).send({ status: "ERR", data: err.message });
  //   }
}

//PARA ELIMINAR UN ARTICULO DE UN CARRITO EXISTENTE
async function DeleteProduct(req, res) {
  try {
    const Product = { IdUsu: req.body.IdUsu, eid: req.body.eid };

    const IdUsu = Product.IdUsu;
    const eid = Product.eid;

    const Cart = await Shoppings.findOne({ IdUsu: IdUsu });
    const cid = Cart._id;

    const CC = Cart.DetalleCarro.find((elemento) => {
      return elemento.eid._id == eid;
    });
    console.log(CC);

    const modifica = await Shoppings.updateOne(
      { _id: cid, "DetalleCarro.eid": eid },
      { $pull: { DetalleCarro: { eid } } },
      { arrayFilters: [{ "DetalleCarro.pid": eid }] }
    );

    res
      .status(200)
      .send({ status: "ok", data: "Se Elmino el Articulo del Carrito" });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

//PARA ELIMINAR UN CARRITO EXISTENTE
async function DeleteShopping(req, res) {
  try {
    const { cid } = req.body;
    const dele = await Shoppings.findByIdAndDelete(cid);
    // console.log(dele);
    res.status(200).send({ status: "ok", data: "Se Elmino el Carrito", dele });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

//PARA CONFIRMAR EL CARRITO EXISTENTE
async function ConfirmaShopping(req, res) {
  try {
    console.log(req.body);
    const PayShopping = {
      cid: req.body.cid,
      FechaPay: req.body.FechaPay,
      TipoPagoPay: req.body.TipoPagoPay,
      TotalCarro: req.body.TotalCarro,
    };

    const cid = PayShopping.cid;
    const FechaPay = PayShopping.FechaPay;
    const TipoPagoPay = PayShopping.TipoPagoPay;
    const TotalCarro = PayShopping.TotalCarro;

    const BackShopping = await Shoppings.findById(cid);

    if (BackShopping) {
      const IdUsu = BackShopping.IdUsu;
      const BackDetalleCarro = BackShopping.DetalleCarro;
      const newCarrito2 = await SchemaPago.create({
        IdUsu,
        FechaCarro: BackShopping.FechaCarro,
        TotalCarro: TotalCarro,
        DetalleCarro: [],
      });
      const newCarrito = await Pay.create({
        IdUsu,
        FechaPay,
        TotalPay: TotalCarro,
        TipoPagoPay,
        DetallePay: [],
      });
      for (let i = 0; i < BackDetalleCarro.length; i++) {
        const eid = BackDetalleCarro[i].eid;
        const element = BackDetalleCarro[i];
        const Product = await SchemaProduct.findOne({
          IdProduct: element.pid.IdProduct,
        });
        console.log(Product);
        const Especi = await Especificaciones.findById(eid);

        newCarrito2.DetalleCarro.push({
          pid: element.pid,
          eid: element.eid,
          IdProductCarro: Product.IdProduct,
          CantProduct: element.CantProduct,
          ParcialProduct: Product.Precio * element.CantProduct,
        });

        newCarrito.DetallePay.push({
          IdProductCarro: Product.IdProduct,
          PcioCarro: Product.Precio,
          CantProduct: element.CantProduct,
          ParcialCarro: Product.Precio * element.CantProduct,
          NomArtCarro: Product.NombreProducto,
          TalleCarro: Especi.Talle,
          ColorCarro: Especi.Color,
        });
        const NewStock = Especi.Stock - element.CantProduct;
        await Especificaciones.findOneAndUpdate(eid, { Stock: NewStock });
      }

      await newCarrito.save();
      await newCarrito2.save();

      // const dele = await Shoppings.findByIdAndDelete(cid)
      return res.status(200).json({
        ok: true,
        data: newCarrito,
      });
    } else {
      res
        .status(500)
        .send({ status: "ERROR CARRO", data: "NO EXISTE CARRITO" });
    }
  } catch (err) {
    res.status(500).send({ status: "ERROR 2", data: err.message });
  }
}

// Endpoint para Crear productos
async function CreateProducts(req, res) {
  try {
    const {
      IdProduct,
      NombreProducto,
      Precio,
      Detalle,
      UltimoPrecio,
      Categoria,
    } = req.body;

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
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

// Endpoint para Crear Especificaciones
async function CreateEspecificaciones(req, res) {
  try {
    const { Color, CodColor, Talle, Stock, Fecha, CodProducto, id } = req.body;

    const NewProduct = await Especificaciones.create({
      Color,
      CodColor,
      Talle,
      Stock,
      Fecha,
      CodProducto,
    });

    const Especific = await Especificaciones.findOne({
      Color: Color,
      Talle: Talle,
    });

    await SchemaProduct.updateOne(
      { _id: id },
      { $push: { Especificaciones: { id: Especific._id } } }
    );

    if (NewProduct) {
      res.status(200).send({ status: "OK", data: NewProduct });
    }
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

// Endpoint para obtener producto completo
async function GetCompleteProduct(req, res) {
  const { IdProduct, id } = req.body;
  try {
    const Product = await SchemaProduct.findOne({ IdProduct: IdProduct });
    const Especi = await Especificaciones.findById(id);

    res.status(200).send({ status: "OK", data: Product });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

// // Endpoint para obtener producto completo
async function GetProducts(req, res) {
  const { IdProduct } = req.body;
  try {
    const Product = await SchemaProduct.findOne({ IdProduct: IdProduct });

    res.status(200).send({ status: "OK", data: Product });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

export {
  PostProduct,
  PushProduct,
  DeleteProduct,
  DeleteShopping,
  ConfirmaShopping,
  CreateProducts,
  CreateEspecificaciones,
  GetCompleteProduct,
  GetProducts,
  GetShopingByIdUsu,
};
