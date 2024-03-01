
import { configEnv } from "./config.js";
import { connectDb } from "./database/db.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouters from "./routes/auth.routes.js";
import "dotenv/config.js";
import bodyParser from "body-parser";


try {

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

  connectDb();

  app.listen(configEnv.appPort.port, () => {
    console.log(`Servidor corriendo en port: ${configEnv.appPort.port}`);
  });
} catch (error) {
  console.log(`ERROR al inicializar backend: ${err.message}`);
}
