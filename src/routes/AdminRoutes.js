import { Router } from "express";
import {GetProducts,
    CreateProducts,
    UpdateProducts,
    DeleteProduct} from '../controllers/AdminController.js';


const router= Router();

router.get('/Admin',GetProducts);
router.post('/Admin',CreateProducts)
router.put("/Admin/:id",UpdateProducts)
router.delete("/Admin/:id",DeleteProduct)

 
export default router

