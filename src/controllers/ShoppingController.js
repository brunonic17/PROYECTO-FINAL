import Shoppings from "../models/shopping.models.js";


async function GetProduct(req,res){
  try{
      const {IdUsu}  = req.body;
      const Carro = await Shoppings.findOne({IdUsu:IdUsu});

      if (Carro) {
        res.status(200).send({ status: 'OK', data: Carro });
      } else {
        res.status(500).send({ status: 'ERR', data: "No Existe Carrito para este Usuario"  });
      }

  }catch(err){
      res.status(500).send({ status: 'ERR', data: err.message });
  }
};

async function PostProduct(req,res) {
try{
  const {IdUsu, IdProduct,  CodProdVenta, NombreProducto, Color, Precio, CantProduct, Talle, FechaCarro, TipoPagoCarro} = req.body;
  
  const newCarrito = await Shoppings.create({
          IdUsu,
          FechaCarro,
          TotalCarro:Precio*CantProduct,
          TipoPagoCarro,
          DetalleCarrito: []
          });
   
        newCarrito.DetalleCarro.push({
                              IdArtCarro : IdProduct,
                              IdProdCarro: CodProdVenta,
                              DescArtCarro : NombreProducto,
                              ColorCarro: Color,
                              TalleCarro : Talle,
                              PcioCarro : Precio,
                              CantCarro : CantProduct,
                              ParcialCarro : Precio*CantProduct} );
        
                              
        //const Total= newCarrito.DetalleCarro.ParcialCarro                      
        //newCarrito.populate ({TotalCarro: Total})
      
        await newCarrito.save()

        return res.status(200).json({
    ok: true,
    data: newCarrito,
  });
     
  } catch (err) {
      res.status(500).send({ status: 'ERR', data: err.message })
  }};

export {GetProduct, PostProduct}