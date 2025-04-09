import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: String,
  title: String,
  price: Number,
  category: String,
  image: String,
  pdf: {
    type: String,  // URL or file path to the PDF
    default: null, // Set it to null by default if no PDF is provided
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
