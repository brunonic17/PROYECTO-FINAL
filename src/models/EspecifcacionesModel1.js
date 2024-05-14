import mongoose from 'mongoose';


mongoose.pluralize(null);

const collection="Especificaciones"


const Especificaciones = new mongoose.Schema({
                            IdProductEspeci:"Number",
                            CodArt:"Number",
                            Color:"String",
                            Talle:"Number",
                            Stock:"Number",
                            Fecha:"date",
                            Estado:{type:"String",enum:['Alta','Baja'],default:'Alta'}}
   
    );




export default mongoose.model( collection , Especificaciones)