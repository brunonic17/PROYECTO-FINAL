import mongoose from 'mongoose';


mongoose.pluralize(null);

const collection="Especificaciones"


const Especificaciones = new mongoose.Schema({
                            IdProduct: { type: 'number', required: true },
                            Color:"String",
                            CodColor:"String",
                            Talle:"Number",
                            Stock:"Number",
                            Fecha:"date",
                            CodProducto:"String",
                            Estado:{type:"String",enum:['Alta','Baja'],default:'Alta'}}
   
    );




export default mongoose.model( collection , Especificaciones)