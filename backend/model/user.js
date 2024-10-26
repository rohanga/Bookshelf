// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  currentlyReading: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      progress: { type: Number, default: 0 },
      comment: { type: String, default: '' }
    }
  ],
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Passwords should be hashed in production
});

module.exports = mongoose.model('User', userSchema);


