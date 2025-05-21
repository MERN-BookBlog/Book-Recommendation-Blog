import Book from "../models/book.model.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, genre, description, image, publishYear } = req.body;

    if (!title || !author || !genre || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, author, description and genre are required.",
      });
    }

    const existingBook = await Book.findOne({ title, author });

    if (existingBook) {
      return res.status(409).json({
        success: false,
        message: "Book already exists !",
      });
    }

    const newBook = new Book({
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim(),
      description: description.trim(),
      image,
      publishYear,
    });

    const savedBook = await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: {
        book: savedBook,
      },
    });
  } catch (err) {
    console.log("Error in addBook Controller : ", err.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId.match(/^[0-9a-fA-F]{24}$/)) {
      // checking if id is valid or not
      return res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    console.error("Error in getBookById Controller:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const { genre, author, title } = req.query;

    let filter = {};

    if (genre) {
      filter.genre = { $regex: genre, $options: "i" }; // case-insensitive partial match
    }

    if (author) {
      filter.author = { $regex: author, $options: "i" };
    }

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    const books = await Book.find(filter);

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.error("Error in getAllBooks Controller:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
