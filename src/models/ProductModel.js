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
    Especificaciones: [({ Color:{ type: 'String', default:"white" },
                          UrlImag:{ type: "String",default: "sin imagen" },
                          EspecificacionesC: [({Talle:{ type: 'String', default:'0' },
                                           Stock:{ type: 'number', default:'0' },
                                           CodProdVenta:{ type: 'number',default:'0' },
                                           FechaAlta:{ type: 'Date', default:1-1-2024 }
                                       })]
        
    })]
});




export default mongoose.model( collection , SchemaPoduct)