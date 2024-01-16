import express from 'express';
import shoppingRouter from './routes/shoppingRoutes.js'
//import morgan from 'morgan';
//import cors from 'cors'; 

//import dotenv from 'dotenv';
//dotenv.config(); 

// import './database/database';

// import { routerProducts } from './routes/productsRoutes.js'; 



const APP_PORT=5050;

// app.use(morgan('dev'));
// app.use(cors());
// app.use(express.json());

// app.use(routerProducts);

try {
  const app = express();

  app.listen(APP_PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${APP_PORT}`)
})
  app.use('/api/shopping', shoppingRouter)

} catch(err) {
  console.log(`Error al Inicializar Backend ${err.message}`)
}



