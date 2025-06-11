import mongoose from "mongoose";

const readingListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Reading list must have a title"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ReadingList = mongoose.model("ReadingList", readingListSchema);

export default ReadingList;
