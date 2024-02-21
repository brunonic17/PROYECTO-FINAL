import SchemaProduct1 from '../models/ProductModel1.js';

import { UploadPicture } from './CloudinaryProductController.js';

// Endpoint para obtener productos completo
 async function GetCompleteProducts(req,res){

    try{


const Data=  await SchemaProduct1.find();

        res.status(200).send({ status: 'OK', data:Data})
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
}

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
async function PushEspecificaciones(req,res){
  try{
      const { Color,Talle,Stock,NombreArt}= req.body;
     
          

      const Product= await SchemaProduct1.updateOne({NombreArticulo:NombreArt},{$push:{Especificaciones:{Color,Talle,Stock}}});

      
       
           if(Product){
      res
      .status(200)
      .send({ status: 'OK', data: Product
    });}
  }catch(err){
      res.status(500).send({ status: 'ERR', data: err.message });
  }
}

// Endpoint para Crear EspecificacionesC
async function CreateEspecificacionesC(req,res){
  try{

    const{_id}=req.params
      const { IdentCb,Talleb,Stockb,CodProdVentab,FechaAltab,IdentColorb}= req.body;
     
          
      const Product= await SchemaProduct1.find({NombreArticulo:NombreArt})
      
       const NewEspecificacionesC= Product.Especificaciones.id(_id)
                 
       NewEspecificacionesC.push({EspecificacionesC:{IdentC:IdentCb,
                                                    IdentColor:IdentColorb,
                                                    Talle:Talleb,
                                                    Stock:Stockb,
                                                    CodProdVenta:CodProdVentab,
                                                    FechaAlta:FechaAltab}})
      await Product.save()      
      

      if(Product){
      res
      .status(200)
      .send({ status: 'OK', data: Product });}
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

    
  
   
    res.status(200).json({
      ok: true,
      data: response
    });
  } catch (ex) {
    return res.status(400).json({
      ok: false,
      err: ex.message,
    });
  }
}

//Endpoint para Modificar ESpecificaciones
async function UpdateEspecificaciones(req, res) {
  try {
     const{Identb,Colorb,NombreProductob}= req.body;

    const Product= await SchemaProduct1.find({NombreProducto:NombreProductob});
    const Especificaciones =Product.Especificaciones.id(_id);
    const ModEspecificaciones=Product.Especificaciones.indexOff(Especificaciones)

    Product.Especificaciones.set(ModEspecificaciones,{Ident:Identb,Color:Colorb});
        
    await Product.save()   
  res.status(200).send({
    ok: true,
    data: Product });
} catch (ex) {
  return res.status(400).json({
    ok: false,
    err: ex.message,
  });
}
}
  // Endpoint para Modificar especificacionesC
async function UpdateEspecificacionesC(req, res) {
    try {
      
      const{_id,_id2}=req.params
      const {          
        Identb,
        IdentColorb,
        Talleb,
        Stockb,
        FechaAltab,
        CodProdVentab
         } = req.body;
     
         
    const Product= await SchemaProduct1.find({NombreProducto:NombreProductob});
    const Especificaciones =Product.Especificaciones.id(_id);
    const EspecificacionesC=Especificaciones.EspecificacionesC.id(_id2);
    const ModEspecificacionesC=Especificaciones.EspecificacionesC.indexOff(EspecificacionesC)

    Product.Especificaciones.set(ModEspecificacionesC,{IdentC:Identb,
                                                     IdentColor:IdentColorb,
                                                     CodProdVenta:CodProdVentab,
                                                     FecahAlta:FechaAltab ,
                                                     Talle:Talleb ,
                                                     Stock:Stockb});

     await Product.save()
  
      res.status(200).json({
        ok: true,
        data: Product,
      });
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
    

    const { _id,_id2  }= req.body;

  
     const result= await UploadPicture(req.files.file[0])
    
      const secure_url = result.secure_url;
     
  //  const response = await SchemaEspecificaciones.findByIdAndUpdate(_id, {
  //     UrlImag: secure_url,
  //   });

    const response= await SchemaProduct1.findById(_id);
    const Especificaciones= response.Especificaciones.id(_id2);
    const ModEspecificaciones=response.Especificaciones.indexOff(Especificaciones);

    response.Especificaciones.set(ModEspecificaciones,{UrlImag: secure_url})

      await response.save()
    res.status(200).json({
      ok: true,
      data: response
    });
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
        const ProductDelete= await SchemaPoduct.findByIdAndDelete(id)

        if(ProductDelete){
            return res.status(200).send({status:"ok",data:"porcess"})
        }

    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
 };

 // Endpoint para Borrar producto entero
 async function DeleteEspecificaciones(req,res){
  try{
      const { id }= req.params
      const EspecificacionesDelete= await SchemaEspecificaciones.findByIdAndDelete(id)

      if(EspecificacionesDelete){
          return res.status(200).send({status:"ok",data:"porcess"})
      }

  }catch(err){
      res.status(500).send({ status: 'ERR', data: err.message });
  }
};

// Endpoint para Borrar producto entero
async function DeleteEspecificacionesC(req,res){
  try{
      const { id }= req.params
      const EspecificacionesDelete= await SchemaEspecificacionesC.findByIdAndDelete(id)

      if(EspecificacionesDelete){
          return res.status(200).send({status:"ok",data:"porcess"})
      }

  }catch(err){
      res.status(500).send({ status: 'ERR', data: err.message });
  }
};

 export {GetCompleteProducts,
        //  GetProducts,
        //  GetEspecificaciones,
        //  GetEspecificacionesC,
         CreateProducts,
         PushEspecificaciones,
         CreateEspecificacionesC,
         UpdateProduct,
         UpdateEspecificaciones,
         UpdateEspecificacionesC,
         UpdatePicture,
         DeleteProduct,
         DeleteEspecificaciones,      
         DeleteEspecificacionesC} 