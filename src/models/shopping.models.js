import mongoose from "mongoose";
import productModel from '../models/ProductModel1.js';

mongoose.pluralize(null);

const Collections1 = "Shoppings";

const SchemaShoppings = new mongoose.Schema ({ 
    IdUsu : {type:"String", required: true},
    FechaCarro : {type: "Date"},
    TotalCarro : {type: "Number"},
    DetalleCarro : {  type: [{  pid: mongoose.Schema.Types.ObjectId,
                                IdProductCarro: { type: 'number', required: true },
                                CantProduct: Number,
                                ParcialProduct: Number
                            }], ref: 'products' }  
})

// Este middleware se va a encargar automáticamente de completar en base a la referencia de arriba



SchemaShoppings.pre('find', function() {
    this.populate(       
        {path:'DetalleCarro.pid',model:productModel})
});


export default mongoose.model(Collections1, SchemaShoppings)