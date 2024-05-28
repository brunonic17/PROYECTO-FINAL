import { Router } from "express";
import { productCard,GetProducts, GetEspecificaiones } from "../controllers/products.controllers.js";

const router = Router();

router.get('/products',GetProducts);

router.get('/productCard/:id',productCard);

router.post('/productCardE',GetEspecificaiones);

export default  router;
