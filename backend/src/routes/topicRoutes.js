import express from 'express';
import { getQuickNotes, generateQuickNotes } from '../controllers/topicController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/topicNotes', authMiddleware, generateQuickNotes);
router.get('/getNotes', authMiddleware, getQuickNotes);

export default router;