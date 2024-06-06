import mongoose from 'mongoose';

//mongoose.set("strictQuery", true);

function connect() {
  mongoose
    .connect ('mongodb+srv://bscistri:keHeDuhBv8MikkAQ@models.rin05k5.mongodb.net/Models')
    //.connect ("mongodb+srv://adminyocampo:yocampo@cluster0.bxsnzji.mongodb.net/YoCampo")
    .then((res) =>
      console.log("Conectado correctamente a la base de datos de mongoose")
    )
    .catch((err) => console.log(err, "Error de Conexion con la DDBB"));
}



export default connect