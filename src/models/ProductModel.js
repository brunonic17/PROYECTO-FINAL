import mongoose from 'mongoose';


mongoose.pluralize(null);

const collection="Products"



const SchemaPoduct = new mongoose.Schema({
    IdProduct: { type: 'number', required: true },
    NombreProducto: { type: 'String', required: true },
    Precio: { type: 'number', required:true },
    UltimoPrecio: { type: 'number', required: true },
    Detalle: { type: 'String', required: true },
    Especificaciones: new mongoose.Schema({ CodProdVenta:{ type: 'number', required: true },
                          Color:{ type: 'String', required: true },
                          UrlImag:{ type: 'String', required: true },
                          EspecificacionesC: new mongoose.Schema({
                                           Talle:{ type: 'String', required: true },
                                           Stock:{ type: 'number', required: true },
                                           FechaAlta:{ type: 'Date', required: true }
                                       })
        
    })
});




export default mongoose.model( collection , SchemaPoduct)