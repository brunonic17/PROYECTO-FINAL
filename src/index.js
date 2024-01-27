import express from 'express';
import shoppingRouter from './routes/shoppingRoutes.js'
import connect from './database/database.js';

const APP_PORT=5050;

try {
  connect()
  
  const app = express();

  app.listen(APP_PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${APP_PORT}, conectado a bbdd`)
})
  app.use('/api/carrito', shoppingRouter)

} catch(err) {
  console.log(`Error al Inicializar Backend ${err.message}`)
}



