import Shoppings from "../models/shopping.models.js";
import Products from "../models/ProductModel1.js";
import Pay from "../models/Pay.models.js";


//BUSCA SI EXISTE CARRITO DEL USUARIO Y LO LISTA
async function GetProduct(req, res) {
  try {
    const { IdUsu,cid,pid} = req.body;
    const Carro = await Shoppings.find({ IdUsu: IdUsu});

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
    
      const Product = await Products.findOne({_id:pid });
      const IdProductCarro = Product.IdProduct
      let ParcialProduct = Product.Precio * CantProduct;
      let TotalCarro = ParcialProduct
      const newCarrito = await Shoppings.create({IdUsu, FechaCarro,TipoPagoCarro, TotalCarro });

      newCarrito.DetalleCarro.push({
        pid,
        IdProductCarro,
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

// PARA AGREGAR ARTICULOS AL CARRITO EXISTENTE DE UN USUARIO
async function PushProduct(req , res) {
  try {

      const {CantProduct, pid, cid, id} = req.body;

          const Product = await Products.findOne({_id:pid });
          const IdProductCarro = Product.IdProduct;
          if (Product.Stock > CantProduct) {
                   
            const ParcialProduct = Product.Precio * CantProduct;
            const Cart = await Shoppings.findOne({_id:cid});
            // let Total=Cart.TotalCarro+ParcialProduct;
            const CC = Cart.DetalleCarro.find(elemento => {return elemento.pid == pid});

            if(CC!=undefined){
              let Total=Cart.TotalCarro-CC.ParcialProduct+ParcialProduct;
              const modific= await Shoppings.updateOne(
                { _id:cid, 'DetalleCarro.pid': pid },
                { TotalCarro:Total, $set: { 'DetalleCarro.$.ParcialProduct':ParcialProduct,'DetalleCarro.$.CantProduct':CantProduct} },
                { arrayFilters: [{ 'DetalleCarro.pid': pid }] }
              );    
              res.status(200).send({status:'ok', data: "Se Modifico el Articulo" })
            }else{
              let Total=Cart.TotalCarro+ParcialProduct;
              const modifica= await Shoppings.updateOne(
              { _id: cid },
              { TotalCarro:Total,
                $push: { DetalleCarro: { pid, CantProduct,ParcialProduct } } }
              );  
              res.status(200).send({status:'ok', data: "se agrego" })
            }       
          } else {
            res
            .status(500)
            .send({ status: "ERR", data: "Cantidad Superior a la Existencia" });
          }   
    } catch (err) {
      res.status(500).send({ status: "ERR", data: err.message });
    }}
 
//PARA ELIMINAR UN ARTICULO DE UN CARRITO EXISTENTE
async function DeleteProduct(req, res) {
  try {
    const {pid, cid} = req.body;

          const Cart = await Shoppings.findOne({_id:cid});
          const CC = Cart.DetalleCarro.find(elemento => {return elemento.pid == pid});
          let Total=Cart.TotalCarro-CC.ParcialProduct;

          const modifica= await Shoppings.updateOne(
            { _id: cid , "DetalleCarro.pid":pid},
            { TotalCarro:Total, $pull: { DetalleCarro: { pid} }},
            { arrayFilters: [{ 'DetalleCarro.pid': pid }] })
 
            res.status(200).send({status:'ok', data: "Se Elmino" })
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

//PARA ELIMINAR UN CARRITO EXISTENTE
async function DeleteShopping(req, res) {
  try {
    const {cid} = req.body;
        const dele = await Shoppings.findByIdAndDelete(cid)
        res.status(200).send({status:'ok', data: "Se Elmino" })
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

//PARA CONFIRMAR EL CARRITO EXISTENTE
async function ConfirmaShopping(req, res) {
  try {
    const {cid, IdUsu, FechaPay, TipoPagoPay} = req.body;
    const BackShopping = await Shoppings.findOne({_id:cid})
    const BackDetalleCarro = BackShopping.DetalleCarro
    const newCarrito = await Pay.create({ IdUsu,
                                          FechaPay,
                                          TotalPay : BackShopping.TotalCarro,
                                          TipoPagoPay
                                        });

            for (numero of BackDetalleCarro) {
                  newCarrito.DetallePay.push(numero)};

    await newCarrito.save();

    return res.status(200).json({
    ok: true,
    data: newCarrito,
    });
  } catch (err) {
    res.status(500).send({ status: "ERROR 2", data: err.message });
  }
}


export {GetProduct, PostProduct, PushProduct, DeleteProduct, DeleteShopping, ConfirmaShopping}