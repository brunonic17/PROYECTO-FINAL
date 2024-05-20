import { Router } from 'express'
import {GetProductShoping, PostProduct, PushProduct, DeleteProduct, DeleteShopping, ConfirmaShopping,
         CreateProducts,  CreateEspecificaciones, GetCompleteProduct, GetProducts,GetShopingByIdUsu} from '../controllers/ShoppingController.js'

const router = Router()

router.get('/:id', GetProductShoping)

router.post('/IdUsu',GetShopingByIdUsu)

router.post('/', PostProduct)

router.patch('/', PushProduct)

router.delete('/', DeleteProduct);

router.delete('/elimina', DeleteShopping);

router.post('/confirma', ConfirmaShopping);

router.post('/Admin',CreateProducts);

router.get('/Admin',GetProducts);

router.post('/Admin/Especificaciones',CreateEspecificaciones);


router.get('/Admin/Especificaciones',GetCompleteProduct);

export default router