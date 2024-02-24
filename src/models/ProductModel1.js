import mongoose from 'mongoose';


mongoose.pluralize(null);

const Collections2="Products1"


const SchemaPoduct1 = new mongoose.Schema({
    IdProduct: { type: 'number', required: true },
    NombreProducto: { type: 'String', required: true },
    Precio: { type: 'number', required:true },
    UltimoPrecio: { type:'number', default:'0' },
    Detalle: { type: 'String', required: true },
    Categoria: { type: 'String', required: true },
    UrlImagen:[{type: 'String'}],  // es un array de strings;
    Color: { type: 'String'},
    Talle: { type: 'Number'},
    Stock: { type: 'Number'},
   
    });




export default mongoose.model( Collections2 , SchemaPoduct1)