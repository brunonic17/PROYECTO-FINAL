// import SchemaPoduct from '../models/ProductModel.js';
// import SchemaEspecificaciones from '../models/EspecificacionesModel.js';
// import SchemaEspecificacionesC from '../models/EspecificacionesCModel.js';
// import { UploadPicture } from './CloudinaryProductController.js';

// // Endpoint para obtener productos completo
//  async function GetCompleteProducts(req,res){

//     try{
// const {NombreProducto,Color,Talleb}= req.body;

// const Data=  await SchemaPoduct.find({NombreProducto:NombreProducto});

// const DataEpecificaciones= await SchemaEspecificaciones.find({Ident:NombreProducto,Color:Color});

// const DataEpecificacionesC= await SchemaEspecificacionesC.find({Ident:NombreProducto,Color:Color});

// DataEpecificaciones.push({EspecificacionesC:DataEpecificacionesC});
// Data.push({Especificaciones:DataEpecificaciones});


// // const Array= data.Especificaciones
// // const data2=Array.findIndex({_id:IdE})
// // const data=  await SchemaPoduct.findOne({Especificaciones:[{_id:IdE}]})

//  // Busca todos los productos en
//         // res.status(200).send({ status: 'OK', data:data2 })
//         // res.status(200).send({ status: 'OK', data: await SchemaPoduct.find({_id:Id},{Especificaciones:[{_id:IdE}]})})  
//         // res.status(200).send({ status: 'OK', data: await SchemaPoduct.findOne({Especificaciones:[{_id:IdE}]})})
//         res.status(200).send({ status: 'OK', data:Data})
//     }catch(err){
//         res.status(500).send({ status: 'ERR', data: err.message });
//     }
// }

// // Endpoint para obtener producto
// async function GetProducts(req,res){

//   try{
// const {NombreProducto}= req.body;

// const Data=  await SchemaPoduct.find({NombreProducto:NombreProducto});


//       res.status(200).send({ status: 'OK', data:Data})
//   }catch(err){
//       res.status(500).send({ status: 'ERR', data: err.message });
//   }
// }

// // Endpoint para obtener Especificaciones
// async function GetEspecificaciones(req,res){

//   try{
// const {NombreProducto,Color}= req.body;

// const DataEpecificaciones= await SchemaEspecificaciones.find({Ident:NombreProducto,Color:Color});

// const DataEpecificacionesC= await SchemaEspecificacionesC.find({Ident:NombreProducto,IdentColor:Color});

// DataEpecificaciones.push({EspecificacionesC:DataEpecificacionesC});




//       res.status(200).send({ status: 'OK', data:DataEpecificaciones})
//   }catch(err){
//       res.status(500).send({ status: 'ERR', data: err.message });
//   }
// }

// // Endpoint para obtener EspecificacionesC
// async function GetEspecificacionesC(req,res){

//   try{
// const {NombreProducto,Color}= req.body;


// const DataEpecificacionesC= await SchemaEspecificacionesC.find({Ident:NombreProducto,IdentColor:Color});

//       res.status(200).send({ status: 'OK', data:DataEpecificacionesC})
//   }catch(err){
//       res.status(500).send({ status: 'ERR', data: err.message });
//   }
// }

// // Endpoint para Crear productos
// async function CreateProducts(req,res){
//     try{
//         const { IdProduct,NombreProducto,Precio,Detalle,UltimoPrecio,Categoria}= req.body;
       
            

//         const NewProduct= await SchemaPoduct.create({
//             IdProduct,
//             NombreProducto,
//             Precio,
//             Detalle,
//             UltimoPrecio,
//             Categoria,
            
                     
//         });

//         if(NewProduct){
//         res
//         .status(200)
//         .send({ status: 'OK', data: NewProduct });}
//     }catch(err){
//         res.status(500).send({ status: 'ERR', data: err.message });
//     }
// }

// // Endpoint para Crear Especificaciones
// async function CreateEspecificaciones(req,res){
//   try{
//       const { Ident,Color}= req.body;
     
          

//       const NewEspecificaciones= await SchemaEspecificaciones.create({
//           Ident,
//            Color,
          
                   
//       });
//       if(NewEspecificaciones
//         ){
//       res
//       .status(200)
//       .send({ status: 'OK', data: NewEspecificaciones
//     });}
//   }catch(err){
//       res.status(500).send({ status: 'ERR', data: err.message });
//   }
// }

// // Endpoint para Crear EspecificacionesC
// async function CreateEspecificacionesC(req,res){
//   try{
//       const { IdentC,Talle,Stock,CodProdVenta,FechaAlta,IdentColor}= req.body;
     
          

//       const NewEspecificacionesC= await SchemaEspecificacionesC.create({
//           IdentC,
//           IdentColor,
//           Talle,
//           Stock,
//           CodProdVenta,
//           FechaAlta
                   
//       });

//       if(NewEspecificacionesC){
//       res
//       .status(200)
//       .send({ status: 'OK', data: NewEspecificacionesC });}
//   }catch(err){
//       res.status(500).send({ status: 'ERR', data: err.message });
//   }
// }

// // Endpoint para Modificar Product
// async function UpdateProduct(req, res) {
//     try {

//       const {NombreProductob,
//              NombreProducto,
//              IdProduct,
//              Precio,
//              Detalle,
//              UltimoPrecio,
//              Categoria,
//          } = req.body;
     
//       const response = await SchemaPoduct.findOneAndUpdate({NombreProducto:NombreProductob},
//         {IdProduct:IdProduct,
//         NombreProducto:NombreProducto,
//         Precio:Precio,
//         Detalle:Detalle,
//         UltimoPrecio:UltimoPrecio,
//         Categoria:Categoria});

    
  
   
//     res.status(200).json({
//       ok: true,
//       data: response
//     });
//   } catch (ex) {
//     return res.status(400).json({
//       ok: false,
//       err: ex.message,
//     });
//   }
// }

// //Endpoint para Modificar ESpecificaciones
// async function UpdateEspecificaciones(req, res) {
//   try {
//      const{Ident,Identb,Color,Colorb}= req.body;
               
//     const NewEspecificaciones= await SchemaEspecificaciones.findOneAndUpdate({Ident:Ident,Color:Color},{
//         Ident:Identb,
//         Color:Colorb});
        
//   res.status(200).send({
//     ok: true,
//     data: NewEspecificaciones });
// } catch (ex) {
//   return res.status(400).json({
//     ok: false,
//     err: ex.message,
//   });
// }
// }
//   // Endpoint para Modificar especificacionesC
// async function UpdateEspecificacionesC(req, res) {
//     try {
      
      
//       const {  NombreProducto,
//         Color,
//         Talle,
//         Identb,
//         IdentColorb,
//         Talleb,
//         Stockb,
//         FechaAltab,
//         CodProdVentab
//          } = req.body;
     
//       const response = await SchemaEspecificacionesC.findOneAndUpdate({IdentC:NombreProducto,IdentColor:Color,Talle:Talle}, {
//         IdentC:Identb,
//         IdentColor:IdentColorb,
//         CodProdVenta:CodProdVentab,
//         FecahAlta:FechaAltab ,
//         Talle:Talleb ,
//         Stock:Stockb
//       });
  
//       res.status(200).json({
//         ok: true,
//         data: response,
//       });
//     } catch (ex) {
//       return res.status(400).json({
//         ok: false,
//         err: ex.message,
//       });
//     }
//   }

// // Endpoint para subir la imagen
// async function UpdatePicture(req, res) {
//   try {
    

//     const { _id  }= req.body;

  
//      const result= await UploadPicture(req.files.file[0])
    
//       const secure_url = result.secure_url;
     
//    const response = await SchemaEspecificaciones.findByIdAndUpdate(_id, {
//       UrlImag: secure_url,
//     });

//     res.status(200).json({
//       ok: true,
//       data: response
//     });
//   } catch (ex) {
//     return res.status(400).json({
//       ok: false,
//       err: ex.message,
//     });
//   }
// }


// // Endpoint para Borrar producto entero
//  async function DeleteProduct(req,res){
//     try{
//         const { id }= req.params
//         const ProductDelete= await SchemaPoduct.findByIdAndDelete(id)

//         if(ProductDelete){
//             return res.status(200).send({status:"ok",data:"porcess"})
//         }

//     }catch(err){
//         res.status(500).send({ status: 'ERR', data: err.message });
//     }
//  };

//  // Endpoint para Borrar producto entero
//  async function DeleteEspecificaciones(req,res){
//   try{
//       const { id }= req.params
//       const EspecificacionesDelete= await SchemaEspecificaciones.findByIdAndDelete(id)

//       if(EspecificacionesDelete){
//           return res.status(200).send({status:"ok",data:"porcess"})
//       }

//   }catch(err){
//       res.status(500).send({ status: 'ERR', data: err.message });
//   }
// };

// // Endpoint para Borrar producto entero
// async function DeleteEspecificacionesC(req,res){
//   try{
//       const { id }= req.params
//       const EspecificacionesDelete= await SchemaEspecificacionesC.findByIdAndDelete(id)

//       if(EspecificacionesDelete){
//           return res.status(200).send({status:"ok",data:"porcess"})
//       }

//   }catch(err){
//       res.status(500).send({ status: 'ERR', data: err.message });
//   }
// };

//  export {GetCompleteProducts,
//          GetProducts,
//          GetEspecificaciones,
//          GetEspecificacionesC,
//          CreateProducts,
//          CreateEspecificaciones,
//          CreateEspecificacionesC,
//          UpdateProduct,
//          UpdateEspecificaciones,
//          UpdateEspecificacionesC,
//          UpdatePicture,
//          DeleteProduct,
//          DeleteEspecificaciones,      
//          DeleteEspecificacionesC} 