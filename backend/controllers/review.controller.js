import Review from "../models/review.model.js";

export const addReview = async (req, res) => {
  try {
    const { rating, comment, userId, bookId } = req.body;

    const newReview = new Review({ rating, comment, userId, bookId });
    await newReview.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
