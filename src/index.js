import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 
import { ConfigCloudinary } from './controllers/CloudinaryProductController.js';

import dotenv from 'dotenv';
dotenv.config(); 

import connect from './database/database';

import  AdminRoutes  from './routes/AdminRoutes.js'; 



const APP_PORT=5000;

ConfigCloudinary('dvrushrqw','497118466574166','icqxE9_gaxrCJzyNHRxQiJN9wRc');



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

  app.use( '/api' ,AdminRoutes );
} catch(err) {
  console.log(`ERROR al inicializar backend: ${err.message}`)
}

