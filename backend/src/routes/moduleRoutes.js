import express from 'express'
import {addModule} from '../controllers/moduleControllers.js'
import {authMiddleware} from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/generate', authMiddleware, addModule);

export default router