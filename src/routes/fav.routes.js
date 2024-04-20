import { Router } from "express";
import { authRequired } from "../middelwares/validateToken.js";
import {
  getFavorites,
  getFavorite,
  deleteFavorite,
  createFavorites,
} from "../controllers/fav.controllers.js";
import { validatorFav } from "../middelwares/validate.fav.js";

const router = Router();

router.post("/favorites",validatorFav,  createFavorites);

router.get("/pageFavorites", authRequired, getFavorites);

router.get("/pageFavorites/:id", authRequired, getFavorite);

router.delete("/pageFavorites/:id", authRequired, deleteFavorite);

export default router;
