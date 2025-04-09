import express from 'express';
import { addBook, getBooks, deleteBook } from '../controllers/bookController.js';
import authMiddleware from '../authMiddleware.js';

const router = express.Router();

router.get("/", getBooks);
router.post('/add-book', authMiddleware, addBook); 
router.delete("/:id", deleteBook); // ✅ This is now correct

export default router;
