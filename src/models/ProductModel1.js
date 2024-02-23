import mongoose from 'mongoose';


mongoose.pluralize(null);

const collection="Products1"


const SchemaPoduct1 = new mongoose.Schema({
    IdProduct: { type: 'number', required: true },
    NombreProducto: { type: 'String', required: true },
    Precio: { type: 'number', required:true },
    UltimoPrecio: { type:'number', default:'0' },
    Detalle: { type: 'String', required: true },
    Categoria:{ type: 'String', required: true },
    UrlImagen:[{type: 'String'}],  // es un array de strings;
    Especificaciones:{type:[{Color:"String",
                            Talle:"Number",
                            Stock:"Number",
                            Fecha:"date",
                            CodProducto:"Sting",
                            Estado:{type:"Sting",enum:[Alta,Baja]}}]}
   
    });




export default mongoose.model( collection , SchemaPoduct1)