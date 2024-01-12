import mongoose, { Collection, Schema } from "mongoose";

mongoose.pluralize (null);

const CollectionShoppings = "Shoppings";

const SchemaShoppings = new mongoose.Schema ({ 
    IdCarro : {type:"String", required: true},
    IdUsuCarro : {type:"String", required: true},
    FechaCarro : {type: "Date", required: true},
    TotalCarro : {type: "String"},
    TipoPagoCarro : {type: "String"},
    DetalleCarro : {type: "Array"},
})

export default mongoose.model(Collection, Schema)