import mongoose from "mongoose";

mongoose.pluralize(null);

const Collections = "Shoppings";

const SchemaShoppings = new mongoose.Schema ({ 
    IdCarro : {type:"String", required: true},
    IdUsuCarro : {type:"String", required: true},
    FechaCarro : {type: "Date", required: true},
    TotalCarro : {type: "String"},
    TipoPagoCarro : {type: "String", enum: ['Transferencia', 'Tarjeta', 'Mercado Pago'], default: 'Transferencia'},
    
})

export default mongoose.model(Collections, SchemaShoppings)