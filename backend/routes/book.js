const express = require('express');
const Book = require('../model/book');

const router = express.Router();
const {
  getCurrentlyReading,
  markAsCurrentlyReading,
  updateReadingProgress,
  markAsFinished,
  getBook
} = require('../controller/book');

// Add Book to Bookshelf
router.post('/add', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(200).send(newBook);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get User's Bookshelf
router.get('/:userId', async (req, res) => {
  try {
    const books = await Book.find({ userId: req.params.userId });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Rating and Review
router.put('/update/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).send(updatedBook);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete Book from Bookshelf
router.delete('/delete/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).send('Book removed');
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get currently reading books
router.get('/currentlyreading/:userId', getCurrentlyReading);
router.get('/getbook/:bookId',getBook)
// Mark a book as currently reading
router.post('/markcurrentlyreading', markAsCurrentlyReading);

// Update reading progress
router.post('/update-progress', updateReadingProgress);

// Mark a book as finished
router.post('/mark-as-finished', markAsFinished);
module.exports = router;


