import { Router } from 'express'
import {GetProduct, PostProduct, PutProduct} from '../controllers/ShoppingController.js'

const router = Router()

router.get('/', GetProduct)

router.post('/', PostProduct)

router.put('/', PutProduct)

export default router