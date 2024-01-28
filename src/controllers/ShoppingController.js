import Shoppings from "../models/shopping.models.js";


async function GetProduct(req,res){
  try{
      res.status(200).send({ status: 'OK', data: await Shoppings.find() });
  }catch(err){
      res.status(500).send({ status: 'ERR', data: err.message });
  }
};

async function PostProduct(req,res) {
try{
  const {IdCarro, IdUsu, FechaCarro, TotalCarro, TipoPagoCarro, IdArtCarro, DescArtCarro, TalleCarro, PcioCarro, CantCarro, ParcialCarro } = req.body;

  const newCarrito = await Shoppings.create({
    IdCarro,
    IdUsu,
    FechaCarro,
    TotalCarro,
    TipoPagoCarro,
    DetalleCarrito: []
    });

  newCarrito.DetalleCarro.push({
                         IdArtCarro : IdArtCarro,
                        DescArtCarro : DescArtCarro,
                        TalleCarro : TalleCarro,
                        PcioCarro : PcioCarro,
                        CantCarro : CantCarro,
                        ParcialCarro : ParcialCarro} ); 

  await newCarrito.save()

  return res.status(200).json({
    ok: true,
    data: newCarrito,
  });
     
  } catch (err) {
      res.status(500).send({ status: 'ERR', data: err.message })
  }};

export {GetProduct, PostProduct}