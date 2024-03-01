import { Router } from 'express'
import {GetProductShoping, PostProduct, PushProduct, DeleteProduct, DeleteShopping, ConfirmaShopping,
         CreateProducts,  CreateEspecificaciones, GetProduct, GetCompleteProduct} from '../controllers/ShoppingController.js'

const router = Router()

router.get('/', GetProductShoping)

router.post('/', PostProduct)

router.patch('/', PushProduct)

router.delete('/', DeleteProduct);

router.delete('/elimina', DeleteShopping);

router.post('/confirma', ConfirmaShopping);

router.post('/Admin',CreateProducts);

router.post('/Admin/Especificaciones',CreateEspecificaciones);

router.get('/Admin',GetProduct);

router.get('/Admin/:id',GetCompleteProduct);

export default router