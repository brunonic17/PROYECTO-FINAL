import mongoose from 'mongoose';


mongoose.pluralize(null);

const collection="EspecificC"




const SchemaEspecificC= new mongoose.Schema({IdentC:{type: 'String'},
                                             IdentColor:{type: 'String',require:true},
                                             Talle:{ type: 'String', default:'0' },
                                             Stock:{ type: 'number', default:'0' },
                                             CodProdVenta:{ type: 'number',default:'0' },
                                             FechaAlta:{ type: 'Date' }
                                       })

export default mongoose.model( collection , SchemaEspecificC)