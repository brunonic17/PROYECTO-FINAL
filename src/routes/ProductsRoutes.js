import {GetAllProducts, GetCategoryProducts}  from "../controllers/ProductsControllers";
import { Router } from "express";

const router = new Router()

router.get('/Products' , GetAllProducts);
router.get('/Products/:Categoria' , GetCategoryProducts)


export default router