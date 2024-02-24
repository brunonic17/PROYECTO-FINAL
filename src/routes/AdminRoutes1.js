import { Router } from "express";
import  multer  from "multer";
import {GetCompleteProducts,
  CreateProducts,
  UploadEspecificaciones,
  UpdateProduct,
  UpdatePicture,
  DeleteProduct,
  DeleteEspecificaciones,      
  }  from '../controllers/AdminController1.js';


const router= Router();

const upload = multer({
    storage: multer.diskStorage({}),
  }).fields([{ name: "file", maxCount: 4 }]);

router.get('/Admin1',GetCompleteProducts);
router.post('/Admin1',CreateProducts);
router.put('/Admin1/Push',UploadEspecificaciones);
router.put('/Admin1/Products',UpdateProduct);
router.put('/Admin1/Picture',[upload],UpdatePicture);
router.delete("/Admin1/:id",DeleteProduct);
router.delete("/Admin1/Especificaciones",DeleteEspecificaciones);


 
export default router

