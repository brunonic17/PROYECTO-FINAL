import Shoppings from "../models/shopping.models.js";
import Products from "../models/ProductModel1.js";


//BUSCA SI EXISTE CARRITO DEL USUARIO Y LO LISTA
async function GetProduct(req, res) {
  try {
    const { IdUsu } = req.body;
    const Carro = await Shoppings.findOne({ IdUsu: IdUsu});


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
      let ParcialProduct = Product.Precio * CantProduct;
      let TotalCarro = ParcialProduct
      const newCarrito = await Shoppings.create({IdUsu, FechaCarro,TipoPagoCarro, TotalCarro });

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

// PARA AGREGAR ARTICULOS AL CARRITO EXISTENTE DE UN USUARIO
async function PushProduct(req , res) {
  try {

      const {CantProduct, pid, cid } = req.body;

          const Product = await Products.findOne({_id:pid });
          if (Product.Stock > CantProduct) {
                   
          let ParcialProduct = Product.Precio * CantProduct;
          const cart=await Shoppings.findById(cid);
          const m=await Shoppings.find({DetalleCarro:{pid:pid}})
          const Total=cart.TotalCarro+ParcialProduct;
          if(cart.DetalleCarro.pid=Product._id){
            const modific= await Shoppings.updateOne(
              { _id:cid, 'DetalleCarro.pid': pid },
              { $set: { 'DetalleCarro.$.CantProduct': CantProduct } },
              { arrayFilters: [{ 'DetalleCarro.pid': pid }] }
            );    
            res.status(200).send({status:'ok', data: "se modifico" })
          }else{
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
    const {cid, pid } = req.body;
    const eliminar=await Shoppings.deleteOne({ 'DetalleCarro.$._id': pid } ,
                                              { arrayFilters: [{ 'DetalleCarro._id': pid }] });

    

    
        
    res.status(200).send({ status: "OK", data: "Articulo Eliminado" });

  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}

export {GetProduct, PostProduct, PushProduct, DeleteProduct}