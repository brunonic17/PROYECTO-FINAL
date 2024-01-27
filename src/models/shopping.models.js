import mongoose from "mongoose";

mongoose.pluralize(null);

const Collections = "Shoppings";

const SchemaShoppings = new mongoose.Schema ({ 
  
 
    //IdCarro : {type:"String", required: true},
    IdUsu : {type:"String"},
    // FechaCarro : {type: "Date", required: true},
    //TotalCarro : {type: "Number"},
    // TipoPagoCarro : {type: "String", enum: ['Pendiente','Transferencia', 'Tarjeta', 'Mercado Pago'], default: 'Pendiente'},
    // DetalleCarro : [{   IdArtCarro : {type: "Number"},
    //                     DescArtCarro : {type: "String"},
    //                     TalleCarro : {type: "Number"},
    //                     PcioCarro : {type: "Number"},
    //                     CantCarro : {type: "Number"},
    //                     ParcialCarro : {type: "Number"}
    //}]
    
})

export default mongoose.model(Collections, SchemaShoppings)