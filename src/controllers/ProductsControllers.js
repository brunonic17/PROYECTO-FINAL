import ProductModel from "../models/ProductModel";

async function GetCategoryProducts(req,res){


    try{
        const {Categoria} = req.params
        res.status(200).send({ status: 'OK', data: await ProductModel.find({Categoria: Categoria }) });
        
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
}

async function GetAllProducts(req,res){


    try{
        res.status(200).send({ status: 'OK', data: await ProductModel.find() });
    }catch(err){
        res.status(500).send({ status: 'ERR', data: err.message });
    }
}


export  {GetCategoryProducts, GetAllProducts} 
