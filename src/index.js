import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 
import body from 'body-parser';



import dotenv from 'dotenv';
dotenv.config(); 

import connect from './database/database';

import  AdminRoutes  from './routes/AdminRoutes.js'; 

import { ConectCloudinary } from './controllers/CloudinaryProductController.js';

const APP_PORT=3002;



try {


  connect();
  
  
   
 ConectCloudinary('dvrushrqw','497118466574166','icqxE9_gaxrCJzyNHRxQiJN9wRc')
  
  const app = express();
  app.use(body.json());
  app.use(body.urlencoded({ extended: true}));
  
  
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

