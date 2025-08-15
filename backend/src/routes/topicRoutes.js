import express from 'express';
import { getNotes, topicNotes } from '../controllers/topicController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/topicNotes', authMiddleware, topicNotes);
router.get('/getNotes', authMiddleware, getNotes);

export default router;