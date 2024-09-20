import { Router } from "express";
import {
  // GetProductShoping,
  PostProduct,
  PushProduct,
  DeleteProduct,
  ConfirmaShopping,
  CreateProducts,
  CreateEspecificaciones,
  GetCompleteProduct,
  GetProducts,
  GetShopingByIdUsu,
} from "../controllers/ShoppingController.js";
import { deleteShopping } from "../controllers/products.controllers.js";
import { authRequired } from "../middelwares/validateToken.js";

const router = Router();

// router.get('/:id', GetProductShoping)
// RUTA QUYE LLEVA AL FRONT LOS PRODUCTOS DEL CARRITO
router.get("/carritos",authRequired, GetShopingByIdUsu);

router.post("/carrito", PostProduct);

// router.post("/IdUsu", GetShopingByIdUsu);

router.patch("/", PushProduct);

router.delete("/carrito", DeleteProduct);

router.delete("/elimina/:id", deleteShopping);

router.post("/confirma", ConfirmaShopping);

router.post("/Admin", CreateProducts);

router.get("/Admin", GetProducts);

router.post("/Admin/Especificaciones", CreateEspecificaciones);

router.get("/Admin/Especificaciones", GetCompleteProduct);

export default router;
