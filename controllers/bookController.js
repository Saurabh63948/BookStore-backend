import Book from "../models/bookModel.js";

// ✅ Add Book Controller
export const addBook = async (req, res) => {
  try {
    const { name, title, price, category, image, pdf } = req.body;

    if (!name || !title || !price || !category || !image || !pdf) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({ name, title, price, category, image , pdf });
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Add Book Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get All Books Controller
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
};


export const deleteBook = async (req, res) => {
  try {
    
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("❌ Delete error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
