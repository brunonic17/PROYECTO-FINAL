import { Router } from 'express'
import shoppingModel from '../models/model.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
      const Shopping = await shoppingModel.find()
      res.status(200).send({ status: 'Ok', data: Shopping })
    } catch (error) {
      console.log(error)
      res.status(400).send({ status: 'Error', data: 'No trae datos' })
    }
  })

export default router