import mongoose from "mongoose";

mongoose.pluralize(null);

const Collections = "Shoppings";

const SchemaShoppings = new mongoose.Schema ({ 
    IdUsu : {type:"String", required: true},
    FechaCarro : {type: "Date", required: true},
    TotalCarro : {type: "Number"},
    TipoPagoCarro : {type: "String", enum: ['Pendiente','Transferencia', 'Tarjeta', 'Mercado Pago'], default: 'Pendiente'},
    DetalleCarro : [{   IdArtCarro : {type: "Number"},
                        IdProdCarro: {type: "Number"},
                        ImgCarro: {Type: "String"},
                        DescArtCarro : {type: "String"},
                        TalleCarro : {type: "Number"},
                        ColorCarro: {type: "String"},
                        PcioCarro : {type: "Number"},
                        CantCarro : {type: "Number"},
                        ParcialCarro : {type: "Number", default: 0}
    }]
    
})

export default mongoose.model(Collections, SchemaShoppings)