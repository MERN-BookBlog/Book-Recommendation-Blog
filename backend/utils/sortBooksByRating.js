import Book from "../models/book.model.js"; // Import the Book model

// Utility function to sort books by average rating in descending order
async function sortBooksByRating() {
  const books = await Book.find(); // Fetch all books from the database

  // Sort books based on their average rating in descending order
  books.sort((a, b) => b.averageRating - a.averageRating);

  return books; // Return the sorted books
}

export default sortBooksByRating;
