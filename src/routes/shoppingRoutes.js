import { Router } from 'express'
import {GetProduct, PostProduct, PushProduct, DeleteProduct, DeleteShopping, ConfirmaShopping } from '../controllers/ShoppingController.js'

const router = Router()

router.get('/', GetProduct)

router.post('/', PostProduct)

router.patch('/', PushProduct)

router.delete('/', DeleteProduct)

router.delete('/elimina', DeleteShopping)

router.post('/confirma', ConfirmaShopping)

export default router