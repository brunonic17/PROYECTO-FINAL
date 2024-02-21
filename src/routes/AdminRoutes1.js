import { Router } from "express";
import  multer  from "multer";
import {GetCompleteProducts,
//   GetProducts,
//   GetEspecificaciones,
//   GetEspecificacionesC,
  CreateProducts,
  PushEspecificaciones,
  CreateEspecificacionesC,
  UpdateProduct,
  UpdateEspecificaciones,
  UpdateEspecificacionesC,
  UpdatePicture,
  DeleteProduct,
  DeleteEspecificaciones,      
  DeleteEspecificacionesC} from '../controllers/AdminController1.js';


const router= Router();

const upload = multer({
    storage: multer.diskStorage({}),
  }).fields([{ name: "file", maxCount: 1 }]);

router.get('/Admin1',GetCompleteProducts);
// router.get('/Admin1/Product',GetProducts);
// router.get('/Admin1/Especificaciones',GetEspecificaciones);
// router.get('/Admin1/EspecificacionesC',GetEspecificacionesC);
router.post('/Admin1',CreateProducts);
router.put('/Admin1/Push',PushEspecificaciones);
router.post('/Admin1/EspecificacionesC',CreateEspecificacionesC);
router.put('/Admin1/Products',UpdateProduct);
router.put('/Admin1/Especificaciones',UpdateEspecificaciones);
router.put('/Admin1/EspecificacionesC',UpdateEspecificacionesC);
router.put('/Admin1/Picture',[upload],UpdatePicture);
router.delete("/Admin1/:id",DeleteProduct);
router.delete("/Admin1/Especificaciones/:id",DeleteEspecificaciones);
router.delete("/Admin1/EspecificacionesC/:id",DeleteEspecificacionesC);

 
export default router

