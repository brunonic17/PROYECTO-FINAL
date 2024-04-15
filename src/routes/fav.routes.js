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

router.post("/favorites", validatorFav, authRequired, createFavorites);

router.get("/Favorites", authRequired, getFavorites);

router.get("/Favorites/:id", authRequired, getFavorite);

router.delete("/Favorites/ :id", authRequired, deleteFavorite);

export default router;
