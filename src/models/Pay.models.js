import mongoose from "mongoose";

mongoose.pluralize(null);

const Collections3 = "Pay";

const SchemaPay = new mongoose.Schema ({ 
    IdUsu : {type:"String", required: true},
    FechaPay : {type: "Date"},
    TotalPay : {type: "Number"},
    TipoPagoPay : {type: "String", enum: ['Transferencia', 'Tarjeta', 'Mercado Pago'], default: 'Mercado Pago'},
    DetallePay : {type: [{ IdProductCarro: { type: 'number'},
                            ImgCarro: {Type: "String"},
                            NomArtCarro : {type: "String"},
                            TalleCarro : {type: "Number"},
                            ColorCarro: {type: "String"},
                            PcioCarro : {type: "Number"},
                            CantProduct : {type: "Number"},
                            ParcialCarro : {type: "Number", default: 0},
                        }], ref: 'products' }
})

export default mongoose.model(Collections3, SchemaPay)