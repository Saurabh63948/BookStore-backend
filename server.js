import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Correct route usage
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log('✅ Server is running on port', process.env.PORT || 8000);
});
