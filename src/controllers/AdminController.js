import SchemaProduct from '../models/ProductModel.js';
import Especificaciones from '../models/EspecificacionesModel.js';
import { UploadPicture } from './CloudinaryProductController.js';

// Endpoint para obtener producto completo
async function GetProducts(req,res){
 
      try{
  
        const Product= await SchemaProduct.find();
  
          res.status(200).send({ status: 'OK', data:Product})
      }catch(err){
          res.status(500).send({ status: 'ERR', data: err.message });
      }
  };


// Endpoint para obtener producto completo
 async function GetCompleteProduct(req,res){
const {id}=req.param
    try{

      const Product= await SchemaProduct.findById(id);

        res.status(200).send({ status: 'OK', data:Product})
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
};
// Endpoint para obtener productos especifico
async function GetProduct(req,res){
  const {id,id2}=req.param
      try{
  
        const Product= await SchemaProduct.findOne({_id:id,Especificaciones:{id:id2}});
  
          res.status(200).send({ status: 'OK', data:Prod})
      }catch(err){
          res.status(500).send({ status: 'ERR', data: err.message });
      }
  };


// Endpoint para Crear productos
async function CreateProducts(req,res){
    try{
        const { IdProduct,NombreProducto,Precio,Detalle,UltimoPrecio,Categoria}= req.body;
       
       

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
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
}

// Endpoint para Crear Especificaciones
async function CreateEspecificaciones(req,res){
  try{
      const { Color,
        CodColor,
        Talle,
        Stock,
        Fecha,
        CodProducto,
        id}= req.body;
     
     
      const NewProduct= await Especificaciones.create({
        Color,
        CodColor,
        Talle,
        Stock,
        Fecha,
        CodProducto
      });
    
      const Especific= await Especificaciones.findOne({Color:Color,Talle:Talle});

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
      const {Color,
        CodColor,
        Talle,
        Stock,
        Fecha,
        CodProducto,
        id,
        Estado}= req.body;

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

      const {
             NombreProducto,
             Precio,
             Detalle,
             UltimoPrecio,
             id} = req.body;
     
      const response = await SchemaProduct.findByIdAndUpdate(id,
        {
        NombreProducto:NombreProducto,
        Precio:Precio,
        Detalle:Detalle,
        UltimoPrecio:UltimoPrecio,
        });

    
  
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
    

    const { _id  }= req.body;

  
     const result= await UploadPicture(req.files.file[0])
    
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
        const { id }= req.body
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
    const {id,id2 } = req.body;


          const DeleteEspecificaciones= await Especificaciones.findByIdAndDelete(id2);
          await SchemaProduct.findByIdAndUpdate(id,{$pull:{Especificaiones:{_id:id2}}});
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
    const {id, id2} = req.body;


          const DeleteEspecificaciones= await SchemaProduct.findById(id);
          
          DeleteEspecificaciones.UrlImagen.pull(id2)

          await  DeleteEspecificaciones.save();
 
            res.status(200).send({status:'ok', data: "Se Elimino" })
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
}
;

 export {GetProducts,
        GetCompleteProduct,
         GetProduct,
         CreateProducts,
         CreateEspecificaciones,
         UploadEspecificaciones,
         UpdateProduct,
         UpdatePicture,
         DeleteProduct,
         DeleteEspecificaciones,
         DeleteImage     
         } 