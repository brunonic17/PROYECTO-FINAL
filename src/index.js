import express from 'express';
import shoppingRouter from './routes/shoppingRoutes.js'
import mongoose from 'mongoose';



const APP_PORT=5050;

//const MONGODB_URL = 'mongodb+srv://adminyocampo:yocampo@cluster0.bxsnzji.mongodb.net/YoCampo'

const MONGODB_URL = 'mongodb+srv://adminyocampo:yocampo@cluster0.bxsnzji.mongodb.net/YoCampo'

try {
  await mongoose.connect(MONGODB_URL)

  const app = express();

  app.listen(APP_PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${APP_PORT}, conectado a bbdd`)
})
  app.use('/api/shopping', shoppingRouter)

} catch(err) {
  console.log(`Error al Inicializar Backend ${err.message}`)
}



