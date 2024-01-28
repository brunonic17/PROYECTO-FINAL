import { Router } from "express";
import  multer  from "multer";
import {GetProducts,
    CreateProducts,
    UpdateProducts,
    UpdatePicture,
    DeleteProduct,
    UpdateEspecificaciones,
    UpdateEspecificacionesC
  } from '../controllers/AdminController.js';


const router= Router();

const upload = multer({
    storage: multer.diskStorage({}),
  }).fields([{ name: "file", maxCount: 1 }]);

router.get('/Admin',GetProducts);
router.post('/Admin',CreateProducts);
router.post('/Admin', upload,UpdatePicture);
router.post('/Admin/Especificaciones', UpdateEspecificaciones);
router.post('/Admin/EspecificacionesC', UpdateEspecificacionesC);
router.put("/Admin/:id",UpdateProducts);
router.delete("/Admin/:id",DeleteProduct);

 
export default router

