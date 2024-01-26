import mongoose from "mongoose";


mongoose.pluralize(null);

const collection = "Comments"

const SchemaComment = new mongoose.Schema ({
    NameUser : {type:'string', required: true},
    Text : {type:'string', required: true},
    Date :{ type: 'Date', default: Date.now},
})

export default mongoose.model (collection, SchemaComment)