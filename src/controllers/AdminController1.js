import SchemaProduct1 from '../models/ProductModel1.js';

import { UploadPicture } from './CloudinaryProductController.js';

// Endpoint para obtener productos completo
 async function GetCompleteProducts(req,res){
const {id,id2}=req.body
    try{


      // const Data=  await SchemaProduct1.find();
      const Prod= await SchemaProduct1.findById(id);

          let Especific=Prod.Especificaciones.find(element=> {return element._id==id2})
      
        res.status(200).send({ status: 'OK', data:Especific})
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
};

// Endpoint para Crear productos
async function CreateProducts(req,res){
    try{
        const { IdProduct,NombreProducto,Precio,Detalle,UltimoPrecio,Categoria,Especificaciones}= req.body;
       
       

        const NewProduct= await SchemaProduct1.create({
            IdProduct,
            NombreProducto,
            Precio,
            Detalle,
            UltimoPrecio,
            Categoria,
            Especificaciones
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
async function UploadEspecificaciones(req,res){
  try{
      const { Color,Talle,Stock,NombreArt,id,id2,Fecha,CodProducto,Estado}= req.body;
     
          const Prod= await SchemaProduct1.findById(id);

          const Especific=Prod.Especificaciones.find(element=> {return element._id==id2})

      
          if(Especific!=undefined){

            const Product= await SchemaProduct1.updateOne(
            {NombreArticulo:NombreArt,'Especificaciones.CodProducto' : CodProducto},
            { $set: { 
                      'Especificaciones.$.Stock': Stock,
                      'Especificaciones.$.Fecha':Fecha ,
                      'Especificaciones.$.Estado':Estado } },
            { arrayFilters: [{ 'Especificaciones.CodProducto' : CodProducto}] }) ;
            if(Product){
              res
              .status(200)
              .send({ status: 'OK', data: Product
            });}

          }else{const Product= await SchemaProduct1.updateOne(
            {NombreArticulo:NombreArt},{$push:{Especificaciones:{Color,Talle,Stock,Fecha,CodProducto}}});
            if(Product){
              res
              .status(200)
              .send({ status: 'OK', data: Product
            });}
          }
       
       
  }catch(err){
      res.status(500).send({ status: 'ERR', data: err.message });
  }
}

// Endpoint para Modificar Product
async function UpdateProduct(req, res) {
    try {

      const {NombreProductob,
             NombreProducto,
             Precio,
             Detalle,
             UltimoPrecio
         } = req.body;
     
      const response = await SchemaProduct1.findOneAndUpdate({NombreProducto:NombreProductob},
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
     
   const response = await SchemaProduct1.findById(_id);
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
        const { id }= req.params
        const ProductDelete= await SchemaProduct1.findByIdAndDelete(id)

        if(ProductDelete){
            return res.status(200).send({status:"ok",data:"porcess"})
        }

    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
 };

// Endpoint para Borrar objeto de Especificaciones
async function DeleteEspecificaciones(req,res){
  try{
      const { NombreArt,CodProducto }= req.body
      // const EspecificacionesDelete= await SchemaProduct1.findById(id)
      // EspecificacionesDelete.Especificaciones.pull({_id:id2})

      const Product= await SchemaProduct1.updateOne(
        {NombreArticulo:NombreArt,'Especificaciones.CodProducto' : CodProducto},
        {$pull:{Especificaciones:{CodProducto}}},
        { arrayFilters: [{'Especificaciones.CodProducto':CodProducto}] })

      if(EspecificacionesDelete){
          return res.status(200).send({status:"ok",data:"Objeto Borrado"})
      }

  }catch(err){
      res.status(500).send({ status: 'ERR', data: err.message });
  }
};

 export {GetCompleteProducts,
         CreateProducts,
         UploadEspecificaciones,
         UpdateProduct,
         UpdatePicture,
         DeleteProduct,
         DeleteEspecificaciones,      
         } 