const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    bookId: {
        type: String, // Use String instead of ObjectId
        required: true
      },
      userId: {
        type: String, // Use String instead of ObjectId
        required: true
      },
      email:{
        type: String, // Use String instead of ObjectId
        required: true
      },
        // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', postSchema);
