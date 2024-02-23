import { Router } from 'express'
import {GetProduct, PostProduct, PushProduct, DeleteProduct} from '../controllers/ShoppingController.js'

const router = Router()

router.get('/', GetProduct)

router.post('/', PostProduct)

router.patch('/', PushProduct)

router.delete('/', DeleteProduct)

// router.delete('/shopping', DeleteShopping)


export default router