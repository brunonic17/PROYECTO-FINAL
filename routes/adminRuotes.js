import { Router } from "express";
import {
  CreateProducts, GetProduct, GetProducts,PutProducts,DeleteProducts
  
} from "../controllers/AdminControllers.js";
import { authRequired } from "../middelwares/validateToken.js";

const router = Router();

router.get("/Admin", authRequired,GetProducts);
router.post("/Admin", authRequired, CreateProducts);
router.get("/Admin/:id", authRequired, GetProduct);
router.put("/Admin/:id", authRequired, PutProducts);
router.delete("/Admin/:id", authRequired, DeleteProducts);

export default router;

// router.get('/Admin',GetProducts);
// router.post('/Admin', upload,UpdatePicture);
// router.put('/Admin/Especificaciones', UpdateEspecificaciones);
// router.put('/Admin/ModifyEpecificaciones',ModifyEspecificaciones)
// router.post('/Admin/EspecificacionesC', UpdateEspecificacionesC);
// router.put("/Admin/:id",UpdateProducts);
// router.delete("/Admin/:id",DeleteProduct);

// const upload = multer({
//     storage: multer.diskStorage({}),
//   }).fields([{ name: "file", maxCount: 1 }]);
