import Review from "../models/review.model.js";

export const addReview = async (req, res) => {
  try {
    const { rating, comment, userId, bookId } = req.body;

    const newReview = new Review({ rating, comment, userId, bookId });
    await newReview.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReviewsByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Validate bookId format
    if (!bookId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    // Find reviews for book
    const reviews = await Review.find({ bookId }).populate(
      "userId",
      "username email"
    );

    if (reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for this book",
      });
    }

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    console.error("Error getReviewsByBookId controller :", err.message);
    res.status(500).json({
      success: false,
      Error: "Internal Server Error",
    });
  }
};
