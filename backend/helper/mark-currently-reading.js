const User = require('../schema/user');
const Book = require('../schema/book');

exports.worker = async function (data, callback) {
 
  let err = {
    status: 200,
    message: ""
  }


    try {
         // Fetch the user by userId
         const user = await User.findOne({ userId: data.userId });
         if (!user) {
          err.status=404
          err.message="User not found"
          return callback(err,null)
         }
 
         // Fetch the book by bookId
         const book = await Book.findOne({ _id :data.bookId });
         if (!book) {
          err.status=404
          err.message="Book not found"
          return callback(err,null)
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
            await user.save();
        }


        return callback(err,user.currentlyReading);
  

  } catch (e) {
    console.log(e)
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
}; 
