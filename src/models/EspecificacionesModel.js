import mongoose from 'mongoose';


mongoose.pluralize(null);

const collection="Especific"



const SchemaEspecificC = new mongoose.Schema({Ident:{type: 'String'},
                                              Color:{ type: 'String', default:"white" },
                                              UrlImag:{ type: "String",default: "sin imagen" }
                                              });

 export default mongoose.model( collection , SchemaEspecificC)