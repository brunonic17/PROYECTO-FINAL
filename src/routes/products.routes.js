import { Router } from "express";
import { productCard,GetProducts } from "../controllers/products.controllers.js";

const router = Router();

router.get('/products',GetProducts);

router.get('/productCard/:id',productCard);

export default  router;
