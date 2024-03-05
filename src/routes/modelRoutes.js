import { Router } from "express";
import {getUsers,createUser} from '../controllers/user.controller.js';


const router= Router();

router.get('/Usuarios',getUsers);
router.post('/Usuarios',createUser);


export default router

