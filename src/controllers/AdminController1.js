import SchemaProduct1 from '../models/ProductModel1.js';

import { UploadPicture } from './CloudinaryProductController.js';

// Endpoint para obtener productos completo
 async function GetCompleteProducts(req,res){

    try{


      const Data=  await SchemaProduct1.find({_id:'65d5271e58e03f80203e45e4',Especificaciones:{_id:'65d5271e58e03f80203e45e5'}});

        res.status(200).send({ status: 'OK', data:Data})
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
      const { Color,Talle,Stock,NombreArt,id,id2}= req.body;
     
          const Prod= await SchemaProduct1.find({NombreArticulo:NombreArt});
          if(Prod){

            const Product= await SchemaProduct1.updateOne(
            {_id:id,NombreArticulo:NombreArt},
            { $set: { 'Especificaciones.$.Color': Color,
                      'Especificaciones.$.Talle': Talle,
                      'Especificaciones.$.Stock': Color } },
            { arrayFilters: [{ 'Especificaciones._id': id2
                     }]})
            if(Product){
              res
              .status(200)
              .send({ status: 'OK', data: Product
            });}

          }else{const Product= await SchemaProduct1.updateOne(
            {NombreArticulo:NombreArt},{$push:{Especificaciones:{Color,Talle,Stock}}});
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
             IdProduct,
             Precio,
             Detalle,
             UltimoPrecio,
             Categoria,
         } = req.body;
     
      const response = await SchemaProduct1.findOneAndUpdate({NombreProducto:NombreProductob},
        {IdProduct:IdProduct,
        NombreProducto:NombreProducto,
        Precio:Precio,
        Detalle:Detalle,
        UltimoPrecio:UltimoPrecio,
        Categoria:Categoria});

    
  
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

  
     const result= await UploadPicture(req.files.file[-1])
    
      const secure_url = result.secure_url;
     
  //  const response = await SchemaEspecificaciones.findByIdAndUpdate(_id, {
  //     UrlImag: secure_url,
  //   });

    const response= await SchemaProduct1.updateOne({_id:_id},
       { $push: { UrlImag: { secure_url } } }
      );
   
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
      const { id,id2 }= req.params
      const EspecificacionesDelete= await SchemaProduct1.findById(id)
      EspecificacionesDelete.Especificaciones.id(id2).deleteOne()

      await EspecificacionesDelete.save()

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
         DeleteEspecificacionesC} 