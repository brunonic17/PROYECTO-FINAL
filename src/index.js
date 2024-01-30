import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 


import dotenv from 'dotenv';
dotenv.config(); 

import connect from './database/database';

import  routerModel  from './routes/modelRoutes.js'; 



const APP_PORT=5000;



try {

  connect();

  const app = express();
  

  app.listen(APP_PORT, () => {
      console.log(`Backend iniciado en puerto ${APP_PORT}, conectado a bbdd`)
  })

  app.use(cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204
  }))
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use( '/' ,routerModel );


} catch(err) {
  console.log(`ERROR al inicializar backend: ${err.message}`)
}

