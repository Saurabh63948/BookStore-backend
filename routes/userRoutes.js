import express from 'express'
import { signUp, login } from "../controllers/userController.js"

const router = express.Router();

router.post('/signUp', signUp);
router.post('/login', login); // ✅ Add this line

export default router;
