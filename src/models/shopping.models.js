import mongoose from "mongoose";
// import productModel from '../models/ProductModel1.js';
import productModel from '../models/ProductModel.js';
import Especificaciones from '../models/EspecifcacionesModel1.js'

mongoose.pluralize(null);

const Collections1 = "Shoppings";

const SchemaShoppings = new mongoose.Schema ({ 
    IdUsu : {type:"String", required: true},
    FechaCarro : {type: "Date"},
    DetalleCarro : {  type: [{  pid: mongoose.Schema.Types.ObjectId,
                                eid: mongoose.Schema.Types.ObjectId,
                                IdProductCarro: { type: 'number' },
                                IdArtCarro: Number,
                                CantProduct: Number,
                            }], ref: 'products' }  
})

// Este middleware se va a encargar automáticamente de completar en base a la referencia de arriba



SchemaShoppings.pre('findOne', function() {
    this.populate(       
        {path:'DetalleCarro.pid',model:productModel})
});

SchemaShoppings.pre('findOne', function() {
    this.populate(       
        {path:'DetalleCarro.eid',model:Especificaciones})
});


export default mongoose.model(Collections1, SchemaShoppings)