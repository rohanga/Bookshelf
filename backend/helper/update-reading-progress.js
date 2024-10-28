const User = require('../schema/user');

exports.worker = async function (data, callback) {
 
  let err = {
    status: 200,
    message: ""
  }

  try {
       // Find the user and populate the currentlyReading books
       const user = await User.findOne({ userId: data.userId }).populate('currentlyReading.book');

       if (!user) {
        err.status=404
        err.message="User not found"
        return  callback(err,null);
       }

       // Find the book in the user's currently reading list
       const bookToUpdate = user.currentlyReading.find(
           (item) => item.book._id.toString() === data.bookId
       );
       console.log(bookToUpdate)
       if (!bookToUpdate) {
        err.status=404
        err.message="Book not found in currently reading list"
        return  callback(err,null);
       }

       // Update the book's progress and comment
       bookToUpdate.progress = data.progress;
       bookToUpdate.comment = data.comment;

       // Save the updated user document
       await user.save();

      //  await user.save();

       // Send back the updated currently reading list
       return callback(err,user.currentlyReading);

  
  } catch (e) {
    console.log(e)
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
}; 
