import mongoose from "mongoose";

const FlashcardSchema = new mongoose.Schema({
  title: String,
  school: String,
  terms: Number,
  createdBy: String,
  contentType: String,
});

export default mongoose.model("Flashcard", FlashcardSchema);
