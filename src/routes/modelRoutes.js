import { Router } from "express";
import getUsers from '../controllers/user.controller.js';


const router= Router();

router.get('/Usuarios',getUsers)


export default router

