import SchemaPoduct from '../models/ProductModel.js';


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
        const { IdProduct,NombreProducto,Precio,Detalle,Talle,UltimoPrecio,FechaAlta,Stock,Color,CodProdVenta}= req.body;
       
        const SpecificColor= await SchemaPoduct.Especificaciones.Especificaciones.create({
            Talle,
            Stock,
            FechaAlta
        });

        const SpecificProduct= await SchemaPoduct.Especificaciones.create({
            Color,
            CodProdVenta,
            UrlImage,
            SpecificColor
        })

        const NewProduct= await SchemaPoduct.create({
            IdProduct,
            NombreProducto,
            Precio,
            Detalle,
            UltimoPrecio,
            SpecificProduct
            
        });



        if(NewProduct){
        res
        .status(200)
        .send({ status: 'OK', data: process });}
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
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
         DeleteProduct} 