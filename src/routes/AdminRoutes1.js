import { Router } from "express";
import  multer  from "multer";
import {GetCompleteProducts,
  CreateProducts,
  UploadEspecificaciones,
  UpdateProduct,
  UpdatePicture,
  DeleteProduct,
  DeleteEspecificaciones,
  DeleteImage      
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
router.delete('/Admin1',DeleteProduct);
router.delete('/Admin1/E',DeleteEspecificaciones);
router.delete("/Admin1/I",DeleteImage)


 
export default router

