import mongoose from 'mongoose';


mongoose.pluralize(null);

const collection="User"

const SchemaUser = new mongoose.Schema({
    numberClient: { type: 'number', required: true },
    nameUser: { type: 'String', required: true },
    pasword: { type: 'number', required:true },
    typeUser: { type: 'String', enum: ['admin', 'buyer'], default: 'buyer' }
})

export default mongoose.model( collection , SchemaUser)