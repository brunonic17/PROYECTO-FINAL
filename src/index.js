<<<<<<< HEAD

import { configEnv } from "./config.js";
import { connectDb } from "./database/db.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouters from "./routes/auth.routes.js";
import favRouters from "./routes/fav.routes.js";
import "dotenv/config.js";
import bodyParser from "body-parser";
=======
import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 
import body from 'body-parser';



import dotenv from 'dotenv';
dotenv.config(); 

import connect from './database/database';

import  AdminRoutes  from './routes/AdminRoutes.js'; 

import { ConectCloudinary } from './controllers/CloudinaryProductController.js';

const APP_PORT=3000;

>>>>>>> origin/Administrador


try {

<<<<<<< HEAD
    const app = express();

  app.use(bodyParser.json());
  app.use(express.json()); //para la aplicación de análisis sintáctico /json
  app.use(
    cors({
      // origin: "*",
      origin: "http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    })
  );
  app.use(express.urlencoded({ extended: true })); //Esta es una función de middleware incorporada en Express. Analiza las solicitudes entrantes. con cargas útiles codificadas en URL y se basa en body-parser .
  app.use(cookieParser());
  //hola mundo


  app.use("/api", authRouters);
  app.use("/api", favRouters);
  

  connectDb();

  app.listen(configEnv.appPort.port, () => {
    console.log(`Servidor corriendo en port: ${configEnv.appPort.port}`);
  });
} catch (error) {
  console.log(`ERROR al inicializar backend: ${err.message}`);
}
=======

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

>>>>>>> origin/Administrador
