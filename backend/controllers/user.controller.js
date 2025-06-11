import Book from "../models/book.model.js";
import User from "../models/user.model.js";

export const getFavoriteBooks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId).populate("favorites");

    res.status(200).json({
      message: "Favorite books fetched successfully",
      favorites: user.favorites,
    });
  } catch (err) {
    console.log("Error in getFavoriteBooks Controller : ", err.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: err.message });
  }
};

export const addBookToFavorites = async (req, res) => {
  const userId = req.user.userId;
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);

    if (user.favorites.includes(bookId)) {
      return res.status(400).json({ message: "Book already in favorites" });
    }

    user.favorites.push(bookId);
    await user.save();

    res.status(200).json({
      message: "Book added to favorites",
      favorites: user.favorites,
    });
  } catch (err) {
    console.log("Error in addBookToFavorites controller : ", err.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: err.message });
  }
};

export const removeBookFromFavorites = async (req, res) => {
  const userId = req.user.userId;
  const { bookId } = req.params;

  try {
    const user = await User.findById(userId);

    const index = user.favorites.indexOf(bookId);
    if (index === -1) {
      return res.status(404).json({ message: "Book not found in favorites" });
    }

    user.favorites.splice(index, 1);
    await user.save();

    res.status(200).json({
      message: "Book removed from favorites",
      favorites: user.favorites,
    });
  } catch (err) {
    console.log("Error in removeBookFromFavorites controller ", err.message);
    res
      .status(500)
      .json({ message: " Internal Server error", error: err.message });
  }
};
