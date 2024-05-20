import mongoose from 'mongoose';
import Especificaciones from '../models/Especificaciones.js';


mongoose.pluralize(null);

const collection="Products"


const SchemaPoduct = new mongoose.Schema({
    IdProduct: { type:'String', required: true },
    NombreProducto: { type: 'String', required: true },
    Precio: { type: 'number', required:true },
    UltimoPrecio: { type:'number', default:'0' },
    Detalle: { type: 'String', required: true },
    Categoria:{ type: 'String', required: true },
    UrlImagen:[{type: 'String'}],  // es un array de strings;
    Especificaciones:{type:[{id:mongoose.Schema.Types.ObjectId}], ref:'Especificaciones'}
   
    });

    SchemaPoduct.pre('findById', function() {
        this.populate({ path: 'Especificaciones.id', model: Especificaciones });
    });

    SchemaPoduct.pre('findOne', function() {
        this.populate({ path: 'Especificaciones.id', model: Especificaciones });
    });


    SchemaPoduct.pre('find', function() {
        this.populate({ path: 'Especificaciones.id', model: Especificaciones });
    });
    




export default mongoose.model( collection , SchemaPoduct)