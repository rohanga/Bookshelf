const User = require('../model/user');
const Book = require('../model/book');
const Comment = require('../model/comment');

// Get currently reading books for a user
exports.getCurrentlyReading = async (req, res) => {

     let data = req.params;

    try {
        const user = await User.findOne({ userId: data.userId }).populate('currentlyReading.book');
        res.json(user.currentlyReading);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Mark a book as currently reading
exports.markAsCurrentlyReading = async (req, res) => {
    console.log(req.body)
    const data = req.body;

    try {
         // Fetch the user by userId
         const user = await User.findOne({ userId: data.userId });
         if (!user) {
             return res.status(404).json({ error: 'User not found' });
         }
 
         // Fetch the book by bookId
         const book = await Book.findOne({ _id :data.bookId });
         if (!book) {
             return res.status(404).json({ error: 'Book not found' });
         }       
        console.log("user====>", user)
        console.log("book==>", book)
        // Check if the book is already in the currently reading list
        let alreadyReading = false
        console.log(" user.currentlyReading==>", user.currentlyReading)
        if (!user.currentlyReading) {
            user.currentlyReading = [];
        }
         alreadyReading = user.currentlyReading.some(
            (item) => item.book.toString() === data.bookId.toString()
        );
        console.log(alreadyReading)
        if (!alreadyReading) {
            // Add the new book entry to the currentlyReading array
            user.currentlyReading.push({ book: book, progress: 0, comment: '' });

            // Save the updated user document back to the database
            await user.save();
        }


        res.json(user.currentlyReading);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};

// Update reading progress
exports.updateReadingProgress = async (req, res) => {
    // const { userId, bookId, progress, comment } = req.body;
    let data=req.body;

    try {
         // Find the user and populate the currentlyReading books
         const user = await User.findOne({ userId: data.userId }).populate('currentlyReading.book');

         if (!user) {
             return res.status(404).json({ error: 'User not found' });
         }
 
         // Find the book in the user's currently reading list
         const bookToUpdate = user.currentlyReading.find(
             (item) => item.book._id.toString() === data.bookId
         );
         console.log(bookToUpdate)
         if (!bookToUpdate) {
             return res.status(404).json({ error: 'Book not found in currently reading list' });
         }
 
         // Update the book's progress and comment
         bookToUpdate.progress = data.progress;
         bookToUpdate.comment = data.comment;
 
         // Save the updated user document
         await user.save();
 
         // Send back the updated currently reading list
         res.json(user.currentlyReading);
 
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Mark a book as finished
exports.markAsFinished = async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const user = await User.findOne({ userId: userId })
        // Remove the book from currently reading list
        user.currentlyReading = user.currentlyReading.filter(
            (item) => item.book._id.toString() !== bookId
        );

        await user.save();
        res.json(user.currentlyReading);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Book.findOne({bookId:bookId})
        const comment = await Comment.find({bookId:bookId})
        console.log("book====>",book.userId)

        const user = await User.findOne({userId:book.userId})
        console.log("user====>",user)
        
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
        let data={
            book:book,
            comment:comment,
            user:user
        }
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};

