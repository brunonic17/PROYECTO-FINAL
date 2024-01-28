import SchemaPoduct from '../models/ProductModel.js';
import UploadPicture from './CloudinaryProductController.js';


// Endpoint para obtener productos
 async function GetProducts(req,res){
    try{
        res.status(200).send({ status: 'OK', data: await Product.find() });
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
}

// Endpoint para Crear productos
async function CreateProducts(req,res){
    try{
        const { IdProduct,NombreProducto,Precio,Detalle,UltimoPrecio,Categoria}= req.body;
       
            

        const NewProduct= await SchemaPoduct.create({
            IdProduct,
            NombreProducto,
            Precio,
            Detalle,
            UltimoPrecio,
            Categoria           
        });



        if(NewProduct){
        res
        .status(200)
        .send({ status: 'OK', data: process });}
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
}

// Endpoint para Caragr especificaciones
async function UpdateEspecificaciones(req, res) {
    try {
      
  
      const { _id,
         Colorb,
         } = req.body;
     
      const response = await SchemaPoduct.findById(_id);
      
      response.Especificaciones.push({Color: Colorb,
                                      })      ;
    await response.save();
  
    // const response = await SchemaPoduct.findByIdAndUpdate(_id, 
    //   {
    //    Especificaciones:{  Color: Colorb}
      
    // });

    res.status(200).json({
      ok: true,
      data: "Listo",
    });
  } catch (ex) {
    return res.status(400).json({
      ok: false,
      err: ex.message,
    });
  }
}
  // Endpoint para Caragr especificacionesC
async function UpdateEspecificacionesC(req, res) {
    try {
      
     
      const { _id,
        Talleb,
        Stockb,
        FechaAltab,
        CodProdVentab
         } = req.body;
     
      const response = await SchemaPoduct.Especificaciones.EspecificacionesC.findByIdAndUpdate(_id, {
        Color: Colorb,
        CodProdVenta: CodProdVentab,
        FecahAlta:FechaAltab ,
        Talle:Talleb ,
        Stock:Stockb
      });
  
      res.status(200).json({
        ok: true,
        data: response,
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
      const { payload } = req;
  
      const { _id } = payload;
  
      const { secure_url } = await UploadPicture(req.files.file[0]);
      console.log(secure_url);
      const response = await SchemaPoduct.Especificaciones.findByIdAndUpdate(_id, {
        UrlImage: secure_url,
      });
  
      res.status(200).json({
        ok: true,
        data: response,
      });
    } catch (ex) {
      return res.status(400).json({
        ok: false,
        err: ex.message,
      });
    }
  }

// Endpoint para Actualizar productos
async function UpdateProducts(req,res){
    try{
        const { IdProduct,NombreProducto,Precio,Detalle,Talle,UltimoPrecio,FechaAlta,Stock,Color,CodProdVenta}= req.body;
        
        const _id = req.params;

        const SpecificColor= await SchemaPoduct.Especificaciones.Especificaciones.findByIdAndUpdate(_id,{
            Talle,
            Stock,
            FechaAlta
        });

        const SpecificProduct= await SchemaPoduct.Especificaciones.findByIdAndUpdate(_id,{
            Color,
            CodProdVenta,
            UrlImage,
            SpecificColor
        })

        const UpdateProduct= await SchemaPoduct.findByIdAndUpdate(_id,{
            IdProduct,
            NombreProducto,
            Precio,
            Detalle,
            UltimoPrecio,
            SpecificProduct
            
        });

       if(UpdateProduct){
        res
        .status(200)
        .send({ status: 'OK', data: process })}
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
}


// Endpoint para Borrar productos
 async function DeleteProduct(req,res){
    try{
        const { id }= req.params
        const ProductDelete= await ProductScheme.findByIdAndDelete(id)

        if(ProductDelete){
            return res.status(200).send({status:"ok",data:"porcess"})
        }

    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
 }

 export {GetProducts,
         CreateProducts,
         UpdateProducts,
         DeleteProduct,
         UpdatePicture,
         UpdateEspecificaciones,
         UpdateEspecificacionesC} 