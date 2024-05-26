import SchemaProduct from '../models/ProductModel.js';
import Especificaciones from '../models/EspecificacionesModel.js';
import { UploadPicture } from './CloudinaryProductController.js';


// Endpoint para obtener todos los productos
async function GetProducts(req,res){
 
  try{
    
  const Product= await SchemaProduct.find();

  res.status(200).send({ status: 'OK', data:Product});

    
  }catch(err){
      res.status(500).send({ status: 'ERR', data: err.message });
  }
};
// Endpoint para obtener todos los productos
async function GetProduct(req,res){
 
  try{
      const {id}=req.params;

  const Product= await SchemaProduct.findById(id);

  res.status(200).send({ status: 'OK', data:Product});

  }catch(err){
      res.status(500).send({ status: 'ERR', data: err.message });
  }
};


// Endpoint para obtener producto completo
 async function GetCompleteProduct(req,res){
const ids={id:req.body.id,
           id2:req.body.id2};

          const id=ids.id;
           const id2=ids.id2;
    try{

      const Product= await SchemaProduct.findById(id);

      if(id2){
       
        res.status(200).send({ status: 'OK', data:Product.Especificaciones.id(id2)})
      }else{
        res.status(200).send({ status: 'OK', data:Product})
      }



    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
};

// Endpoint para Crear productos
async function CreateProducts(req,res){
    try{
        // const { IdProduct,NombreProducto,Precio,Detalle,UltimoPrecio,Categoria}= req.body;

      const Prod={ IdProduct: req.body.IdProduct,
                    NombreProducto : req.body.NombreProducto,
                    Precio: req.body.Precio,
                   Detalle:req.body.Detalle,
                   Categoria:req.body.Categoria,
                   UltimoPrecio:req.body.UltimoPrecio
                  };
              
            const IdProduct=Prod.IdProduct;
            const NombreProducto=Prod.NombreProducto;
            const Precio=Prod.Precio;
            const Detalle=Prod.Detalle;
            const UltimoPrecio=Prod.UltimoPrecio;
            const Categoria=Prod.Categoria;
      //  if(Product){}
      //      res.status(500).send({ status: 'ERR', data:"EL producto ya existe" });
      //  }else{
        const NewProduct= await SchemaProduct.create({
          IdProduct,
          NombreProducto,
          Precio,
          Detalle,
          UltimoPrecio,
          Categoria,
          Especificaciones:[]
      });
        

        if(NewProduct){
        res
        .status(200)
        .send({ status: 'OK', data: NewProduct });}
      // }
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
}

// Endpoint para Crear Especificaciones
async function CreateEspecificaciones(req,res){
  try{
      const E= { Color:req.body.Color,
        CodColor:req.body.CodColor,
        Talle:req.body.Talle,
        Stock:req.body.Stock,
        Fecha:req.body.Fecha,
        CodProducto:req.body.CodProducto,
        id:req.body.id};

     const Color=E.Color;
     const CodColor=E.CodColor;
     const Talle=E.Talle;
     const Stock=E.Stock;
     const Fecha=E.Fecha;
     const CodProducto=E.CodProducto;
     const _IdProduct=E.id;
     
      const NewProduct= await Especificaciones.create({
        Color,
        CodColor,
        Talle,
        Stock,
        Fecha,
        CodProducto,
        _IdProduct
      });
    
      const Especific= await Especificaciones.findOne({Color:Color,Talle:Talle,_IdProduct:_IdProduct});

      await SchemaProduct.updateOne({_id:id},
                                    {$push:{Especificaciones:{id:Especific._id}}});
      

      if(NewProduct){

      res
      .status(200)
      .send({ status: 'OK', data: NewProduct });}
  }catch(err){
      res.status(500).send({ status: 'ERR', data: err.message });
  }
}

// Endpoint para Modificar Especificaciones
async function UploadEspecificaciones(req,res){
  try{
      const New={Color:req.body.Color,
        CodColor:req.body.CodColor,
        Talle:req.body.Talle,
        Stock:req.body.Stock,
        Fecha:req.body.Fecha,
        CodProducto:req.body.CodProducto,
        id:req.body.id,
        Estado:req.body.Estado};

       const Color=New.Color;
       const CodColor=New.CodColor;
       const Talle=New.Talle;
       const Stock=New.Stock;
       const Fecha=New.Fecha;
       const CodProducto=New.CodProducto;
       const id=New.id;
       const Estado=New.Estado;



       const Especific=await  Especificaciones.findByIdAndUpdate(id,
        {Color:Color,
        CodColor:CodColor,
        Talle:Talle,
        Stock:Stock,
        Fecha:Fecha,
        CodProducto:CodProducto,
        Estado:Estado
         },{new:true})
     
        
            if(Especific){
              res
              .status(200)
              .send({ status: 'OK', data: Especific
            })};   
       
  }catch(err){
      res.status(500).send({ status: 'ERR', data: err.message });
  }}

// Endpoint para Modificar Product
async function UpdateProduct(req, res) {
    try {

      const New = {
             NombreProducto: req.body.NombreProducto,
             Precio: req.body.Precio,
             Detalle: req.body.Detalle,
             UltimoPrecio: req.body.UltimoPrecio,
             id:req.body.id } ;

        const NombreProducto=New.NombreProducto;
        const Precio=New.Precio;
        const Detalle=New.Detalle;
        const UltimoPrecio=New.UltimoPrecio;
        const id=New.id;

     
      const response = await SchemaProduct.findByIdAndUpdate(id,
        {
        NombreProducto:NombreProducto,
        Precio:Precio,
        Detalle:Detalle,
        UltimoPrecio:UltimoPrecio,
        },{new:true});

    
  
   if(response){
    res.status(200).json({
      ok: true,
      data: response
    })};
  } catch (ex) {
    return res.status(400).json({
      ok: false,
      err: ex.message,
    });
  }
}

// Endpoint para subir la imagen
async function UpdatePicture(req, res) {
  try {
    

    const _id = req.body._id;
    const picture=req.files.file[0];

  // console.log(req.body);
  // console.log(picture);

    const result= await UploadPicture(picture);
  // console.log(result);

      const secure_url = result.secure_url;
     
   const response = await SchemaProduct.findById(_id);
   response.UrlImagen.push(secure_url);

   const saveImage =await response.save();

   
      if(response){
    res.status(200).json({
      ok: true,
      data: saveImage
    })};
  } catch (ex) {
    return res.status(400).json({
      ok: false,
      err: ex.message,
    });
  }
}

// Endpoint para Borrar producto entero
 async function DeleteProduct(req,res){
    try{
        const  id = req.body.id
        const ProductDelete= await SchemaProduct.findByIdAndDelete(id)

        if(ProductDelete){
            return res.status(200).send({status:"ok",data:"Se elimino el prducto"})
        }

    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
 };

// Endpoint para Borrar objeto de Especificaciones
async function DeleteEspecificaciones(req,res){
  try {
    const Delete= {id,
      id2 } ;

      const id=Delete.id;
      const id2=Delete.id2;

          const DeleteEspecificaciones= await Especificaciones.findByIdAndDelete(id2);
          await SchemaProduct.findByIdAndUpdate(id,{$pull:{Especificaciones:{_id:id2}}});
       if(DeleteEspecificaciones){
            res.status(200).send({status:'ok', data: "Se Elimino" })}
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}
;

// Endpoint para Borrar objeto de Especificaciones
async function DeleteImage(req,res){
  try {
    const Delete= {id,
      id2 } ;

      const id=Delete.id;
      const id2=Delete.id2;

          const DeleteEspecificaciones= await SchemaProduct.findById(id);
          
          DeleteEspecificaciones.UrlImagen.pull(id2)

          await  DeleteEspecificaciones.save();
 
    res.status(200).send({status:'ok', data: "Se Elimino" })
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}
;

 export {GetProduct,
         GetProducts,
        GetCompleteProduct,
         CreateProducts,
         CreateEspecificaciones,
         UploadEspecificaciones,
         UpdateProduct,
         UpdatePicture,
         DeleteProduct,
         DeleteEspecificaciones,
         DeleteImage     
         } 