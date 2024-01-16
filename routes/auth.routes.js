import { Router  } from "express";
import { login, register } from "../controllers/auth.controllers.js";
import { check } from "express-validator";
import validateResult from "../middelwares/validate.express.js";
import { validatorAuth } from "../middelwares/auth.validate.js";

const router = Router()

router.post("/register",validatorAuth , register);


router.post("/login", login)

export default router

//[check("nameUser", "El name es requerido").notEmpty(), validateResult ]