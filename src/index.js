import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 

import dotenv from 'dotenv';
dotenv.config(); 

import './database/database';

import { routerProducts } from './routes/productsRoutes'; 

const app = express();

app.set('PORT', process.env.PORT || 5000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(routerProducts);

app.listen(app.get('PORT'), () => {
    console.log(`Servidor ejecutándose en puerto
    ${app.get('PORT')}`);
});



