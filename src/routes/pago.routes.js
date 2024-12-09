import { Router } from "express";
import {
  createOrder,
  receiveWebhook,
} from "../controllers/pago.controllers.js";
const router = Router();

router.post("/create-order", createOrder);
router.get("/succes", (req, res) => res.send("Sastifactorio el Orden de Pago"));
router.get("/failure", (req, res) => res.send("Failure"));
router.get("/pending", (req, res) => res.send("Pending"));

router.post("/webhook", receiveWebhook);

export default router;

//387349 Rivero s/c 30795_1
//387438 Jimenez s/c 30795_1
//387688 Alderetes s/c 30795_1
//389481 Bonura s/c 30795_1
//395036 Avalos s/c 30795_1
//395844 Ortiz s/c 30795_1
//410143 Chapelo s/c 30795_1
//425565 Aguirre s/c 30795_1
//451297 Mahumad s/c  30795_2 (1 deuda)
//462339 Iniguez s/c 30795_1
//474495 Paz s/c 30795_1
//697852 Ibarra s/c 30795_1
//hoy
//427841 Alderete s/c 78846_1
//429992 Cornejo s/c 78846_1
//707923 Del Rio s/c 30795_1 y 78846_1
//372564 Fernandez s/c 30795_1
//707820 Gramajo s/c 30795_1
//706413 Guerra s/c 30795_1 y 78846_1
//421126 Heredia s/c 309686_1
//439248 Medina s/c 30795_1 y 78846_1
//440913 Medina Silvio s/c 30795_1 y 78846_1
//706820 Montañez s/c 24118_1 y 78846_1
//443928 Ortiz s/c 78846_1
//443928 Ortiz Hugo s/c 78846_1
//383037 Quiroga s/c 78846_1
//707505 Retamozo s/c 30795_1
//421084 Soria s/c 30795_1
//438118 Valdez s/c 30795_1 (cambiar fecha para mañana)
//465103 Velardez s/c 30795_1 y 78846_1
//410204 Zottola s/c 24118_1 y 78846_19BD358A42KYH79629
//367319 Cordoba s/c 30795_2 (deuda)AD049DI
