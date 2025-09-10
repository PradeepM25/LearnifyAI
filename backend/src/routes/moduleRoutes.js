import express from 'express'
import {addModule, getModules} from '../controllers/moduleControllers.js'
import {authMiddleware} from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/generate', authMiddleware, addModule);
router.get('/getAll', authMiddleware, getModules);

export default router