import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouters from "../routes/auth.routes.js";
import "dotenv/config.js";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.json());
app.use(express.json()); //para la aplicación de análisis sintáctico /json
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(express.urlencoded({ extended: true })); //Esta es una función de middleware incorporada en Express. Analiza las solicitudes entrantes. con cargas útiles codificadas en URL y se basa en body-parser .
app.use(cookieParser());

app.use("/api", authRouters);
