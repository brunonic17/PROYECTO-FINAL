import { Router } from 'express'
import {GetProduct, PostProduct, PushProduct, DeleteProduct, DeleteShoping} from '../controllers/ShoppingController.js'

const router = Router()

router.get('/', GetProduct)

router.post('/', PostProduct)

router.patch('/', PushProduct)

router.delete('/', DeleteProduct)

router.delete('/elimina', DeleteShoping)



export default router