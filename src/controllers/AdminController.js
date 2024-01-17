import Product from '../models/ProductModel.js';


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
        const { NameProduct,CodigoPduct,Rubro,Detalle,Talles,Precio,FechaAlta,Stock}= req.body;
        const NewProduct= await ProductScheme.create({
            NameProduct,
            CodigoPduct,
            Rubro,
            Detalle,
            Talles,
            Precio,
            FechaAlta,
            Stock
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
        const { NameProduct,CodigoPduct,Rubro,Detalle,Talles,Precio,FechaAlta,Stock}= req.body;
        const _id = req.params;

        const UpdateProduct= await ProductScheme.findByIdAndUpdate(id,{
            NameProduct,
            CodigoPduct,
            Rubro,
            Detalle,
            Talles,
            Precio,
            FechaAlta,
            Stock
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