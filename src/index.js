import express from 'express';
import mongoose from 'mongoose';
import shoppingRouter from './routes/shoppingRoutes.js'
import connect from './database/database.js';
import bodyParser from 'body-parser';
import cors from"cors";

const APP_PORT=5050;



try {
  connect()
  const app = express();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }));
    app.use(cors(
      {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204
  }
  ))
  app.use(express.json());
  
  


  app.listen(APP_PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${APP_PORT}, conectado a bbdd`)
})
  app.use('/api/carrito', shoppingRouter)

} catch(err) {
  console.log(`Error al Inicializar Backend ${err.message}`)
}



