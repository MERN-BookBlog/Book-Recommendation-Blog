import Book from "../models/book.model.js";
import User from "../models/user.js";

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

export const getPersonalizedBooks = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.userId;

    // Fetch user's preferences
    const user = await User.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const { preferredGenres, preferredAuthors } = user;
    const genres = preferredGenres || [];
    const authors = preferredAuthors || [];

    // Match books with either genre or author
    const matchedBooks = await Book.find({
      $or: [{ genre: { $in: genres } }, { author: { $in: authors } }],
    });

    res.status(200).json({
      success: true,
      data: matchedBooks,
    });
  } catch (err) {
    console.error("Error in getPersonalizedBooks Controller:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTopRatedBooks = async (req, res) => {
  try {
    const { genre, author, title } = req.query;
    const limit = parseInt(req.query.limit) || 10;

    let filter = {};

    if (genre) {
      filter.genre = { $regex: genre, $options: "i" };
    }

    if (author) {
      filter.author = { $regex: author, $options: "i" };
    }

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    // Only include books that have at least one rating
    filter.totalRatings = { $gt: 0 };

    const books = await Book.find(filter)
      .sort({ averageRating: -1, totalRatings: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.error("Error in getTopRatedBooks Controller:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
