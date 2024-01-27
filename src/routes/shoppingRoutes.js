import { Router } from 'express'
import {GetProduct, PostProduct} from '../controllers/ShoppingController.js'

const router = Router()

router.get('/', GetProduct)

router.post('/', PostProduct)

export default router