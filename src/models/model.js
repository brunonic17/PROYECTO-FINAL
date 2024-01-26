import mongoose from "mongoose";

mongoose.pluralize(null);

const Collections = "Shoppings";

const SchemaShoppings = new mongoose.Schema ({ 
    IdCarro : {type:"String", required: true},
    IdUsuCarro : {type:"String", required: true},
    FechaCarro : {type: "Date", required: true},
    TotalCarro : {type: "String"},
    TipoPagoCarro : {type: "String", enum: ['Pendiente','Transferencia', 'Tarjeta', 'Mercado Pago'], default: 'Pendiente'},
    DetalleCarro : [{   IdArtCarro : {type: "Number"},
                        DescArtCarro : {type: "string"},
                        TalleCarro : {type: "Number"},
                        PcioCarro : {type: "Number"},
                        CantCarro : {type: "Number"},
                        ParcialCarro : {type: "Number"}
    }]
    
})

export default mongoose.model(Collections, SchemaShoppings)