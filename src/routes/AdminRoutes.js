import { Router } from "express";
import  multer  from "multer";
import {GetProducts,
  GetCompleteProduct,
  GetProduct,
  CreateProducts,
  CreateEspecificaciones,
  UploadEspecificaciones,
  UpdateProduct,
  UpdatePicture,
  DeleteProduct,
  DeleteEspecificaciones,
  DeleteImage      
  }  from '../controllers/AdminController.js';


const router= Router();

const upload = multer({
    storage: multer.diskStorage({}),
  }).fields([{ name: "file", maxCount: 4 }]);

router.get('/Admin',GetProducts)
router.get('/Admin/:id',GetCompleteProduct);
router.get('/Admin/Product/:id/:id2',GetProduct);
router.post('/Admin',CreateProducts);
router.post('/Admin/Especificaciones',CreateEspecificaciones);
router.put('/Admin/Push',UploadEspecificaciones);
router.put('/Admin/Products',UpdateProduct);
router.put('/Admin/Picture',[upload],UpdatePicture);
router.delete('/Admin',DeleteProduct);
router.delete('/Admin/Especificaciones',DeleteEspecificaciones);
router.delete("/Admin/Image",DeleteImage)


 
export default router

