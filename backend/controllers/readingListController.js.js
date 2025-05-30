import ReadingList from "../models/readingList.js";

// POST /reading-list
export const addBookToReadingList = async (req, res) => {
  try {
    const { listId, bookId } = req.body;

    if (!listId || !bookId) {
      return res.status(400).json({ message: "listId and bookId are required." });
    }

    const readingList = await ReadingList.findOne({
      _id: listId,
      user: req.user._id,
    });

    if (!readingList) {
      return res.status(404).json({ message: "Reading list not found." });
    }

    if (!readingList.books.includes(bookId)) {
      readingList.books.push(bookId);
      await readingList.save();
    }

    res.status(200).json({ message: "Book added to reading list.", readingList });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /reading-lists
export const getAllReadingListsForUser = async (req, res) => {
  try {
    const lists = await ReadingList.find({ user: req.user._id }).populate("books");

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
