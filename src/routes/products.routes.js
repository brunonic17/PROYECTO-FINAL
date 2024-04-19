import { Router } from "express";
import { GetProducts } from "../controllers/products.controllers.js";

const router = Router();

router.get('/products',GetProducts);

export default  router;
