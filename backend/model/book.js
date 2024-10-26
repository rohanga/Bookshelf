const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  userId: String, // To associate with the logged-in user
  bookId: String, // Google Books ID or similar
  title: String,
  authors: [String],
  thumbnail: String,
  averageRating: Number,
  userRating: Number,
  userReview: String,
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who added the book to the bookshelf
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Book', bookSchema);
