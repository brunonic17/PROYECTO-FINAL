import express from 'express';
import shoppingRouter from './routes/shoppingRoutes.js'
import connect from './database/database.js';
import bodyParser from 'body-parser';

const APP_PORT=5050;

const app = express();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

try {
  connect()
  
  


  app.listen(APP_PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${APP_PORT}, conectado a bbdd`)
})
  app.use('/api/carrito', shoppingRouter)

} catch(err) {
  console.log(`Error al Inicializar Backend ${err.message}`)
}



