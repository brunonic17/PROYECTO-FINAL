import express from "express";
// import mongoose from "mongoose";
import shoppingRouter from "./routes/shoppingRoutes.js";
import connect from "./database/database.js";
import bodyParser from "body-parser";
import cors from "cors";

import { configEnv } from "./config.js";
import { connectDb } from "./database/db.js";

import cookieParser from "cookie-parser";
import authRouters from "./routes/auth.routes.js";
import favRouters from "./routes/fav.routes.js";
import productsRouters from "./routes/products.routes.js";
import "dotenv/config.js";

// const APP_PORT=5000;

try {
  connect();
  const app = express();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(
    cors({
      // origin: "*",
      origin: "http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); //Esta es una función de middleware incorporada en Express. Analiza las solicitudes entrantes. con cargas útiles codificadas en URL y se basa en body-parser .
  app.use(cookieParser());

  app.use("/api", authRouters);
  app.use("/api", favRouters);
  app.use("/api", productsRouters);
  app.use("/api", shoppingRouter);

  connectDb();

  app.listen(configEnv.appPort.port, () => {
    console.log(`Servidor corriendo en port: ${configEnv.appPort.port}`);
  });

  //   app.listen(APP_PORT, () => {
  //     console.log(`Servidor ejecutándose en puerto ${APP_PORT}, conectado a bbdd`)
  // })
} catch (err) {
  console.log(`Error al Inicializar Backend ${err.message}`);
}
