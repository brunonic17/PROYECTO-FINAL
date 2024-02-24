import mongoose from "mongoose";
import productModel from '../models/ProductModel1.js';

mongoose.pluralize(null);

const Collections = "Shoppings";

const SchemaShoppings = new mongoose.Schema ({ 
    IdUsu : {type:"String", required: true},
    FechaCarro : {type: "Date"},
    TotalCarro : {type: "Number"},
    TipoPagoCarro : {type: "String", enum: ['Pendiente','Transferencia', 'Tarjeta', 'Mercado Pago'], default: 'Pendiente'},
    DetalleCarro : {  type: [{ pid: mongoose.Schema.Types.ObjectId,pid2:mongoose.Schema.Types.ObjectId, CantProduct: Number , ParcialProduct: Number}], ref: 'products' }  
})

// Este middleware se va a encargar automáticamente de completar en base a la referencia de arriba



SchemaShoppings.pre('find', function() {
    this.populate(       
        {path:'DetalleCarro.pid',model:productModel})
});


export default mongoose.model(Collections, SchemaShoppings)