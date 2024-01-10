import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 

import dotenv from 'dotenv';
dotenv.config(); 

// import './database/database';

// import { routerProducts } from './routes/productsRoutes.js'; 

const app = express();

const APP_PORT=process.env.APP_PORT;

// app.use(morgan('dev'));
// app.use(cors());
// app.use(express.json());

// app.use(routerProducts);

app.listen( APP_PORT, () => {
    console.log(`Servidor ejecutándose en puerto
    ${APP_PORT}`)
    app.get('/',async (req,res)=>{
      res.status(200).send({status:"OK", data:"sistema iniciado"})
    })
});



