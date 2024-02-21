import { Router } from 'express'
import {GetProduct, PostProduct, PushProduct, PatchProduct} from '../controllers/ShoppingController.js'

const router = Router()

router.get('/', GetProduct)

router.post('/', PostProduct)

router.patch('/', PushProduct)

// router.patch('/', PatchProduct)

export default router