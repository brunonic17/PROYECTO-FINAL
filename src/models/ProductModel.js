import mongoose from 'mongoose';


mongoose.pluralize(null);

const collection="Products"



const SchemaPoduct = new mongoose.Schema({
    IdProduct: { type: 'number', required: true },
    NombreProducto: { type: 'String', required: true },
    Precio: { type: 'number', required:true },
    UltimoPrecio: { type:'number', default:'0' },
    Detalle: { type: 'String', required: true },
    Categoria:{ type: 'String', required: true },
    
    });




export default mongoose.model( collection , SchemaPoduct)